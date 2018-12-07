import { MapView } from 'expo';
import { Button, Container, Fab, Icon, Text, Toast } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import RNGooglePlaces from 'react-native-google-places';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setRangeOption } from '../actions';
import {
  changeLocation,
  changeStationType,
  startNavigating,
  stopNavigating,
} from '../actions/ExploreActions';
import NavigationRoute from '../components/NavigationRoute';
import showRangeOptions from '../components/RangeOptions';
import StationMarkers from '../components/StationMarkers';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { RANGE_VALUES } from '../constants/RangeOptions';
import { ATM, GAS, NONE } from '../constants/StationTypes';
import { propTypes as LocationProps } from '../model/Location';
import { computeDistanceBetween } from '../common/HelperFunction';

class MainExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.shape(LocationProps),
    rangeOption: PropTypes.number.isRequired,
    setRangeOption: PropTypes.func.isRequired,
    stopNavigating: PropTypes.func.isRequired,
    startNavigating: PropTypes.func.isRequired,
    isNavigating: PropTypes.bool,
    changeLocation: PropTypes.func.isRequired,
    soundID: PropTypes.number.isRequired,
    vibrate: PropTypes.bool.isRequired,
    stationType: PropTypes.oneOf([ATM, GAS, NONE]).isRequired,
  };

  constructor() {
    super();

    this.state = {
      currentLocation: {
        latitude: 10.8703,
        longitude: 106.8034513,
      },
      isNotifying: false,
    };

    this.mapView = null;
    this.isFitted = false;
    this.configBackgroundGeolocation();

    this.onSearchPress = this.onSearchPress.bind(this);
    this.onPickPress = this.onPickPress.bind(this);
    this.onLocatePress = this.onLocatePress.bind(this);
    this.onRangePress = this.onRangePress.bind(this);
    this.fitToCoordinates = this.fitToCoordinates.bind(this);
    this.startNavigating = this.startNavigating.bind(this);
    this.stopNavigating = this.stopNavigating.bind(this);
    this.onStationPress = this.onStationPress.bind(this);
  }

  render() {
    return (
      <Container>
        <View style={styles.addressBar}>
          <Button
            delayPressIn={0}
            rounded
            transparent
            full
            androidRippleColor="lightgray"
            onPress={this.onSearchPress}
            style={{ flex: 1 }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              uppercase={false}
              style={{ color: Colors.darkGrayBackground }}>
              {this.props.location
                ? `${this.props.location.address}`
                : 'Search...'}
            </Text>
          </Button>
          <Button
            delayPressIn={0}
            rounded
            icon
            transparent
            style={styles.pickButton}
            androidRippleColor="lightgray"
            onPress={this.onPickPress}>
            <Icon name="location" type="Entypo" style={{ color: '#000' }} />
          </Button>
        </View>
        <Fab
          delayPressIn={0}
          active={false}
          style={styles.rangeButton}
          position="bottomRight"
          onPress={this.onRangePress}>
          <Icon
            name="street-view"
            type="FontAwesome"
            style={{ color: 'gray' }}
          />
        </Fab>
        <Fab
          delayPressIn={0}
          style={styles.myLocationButton}
          position="bottomRight"
          onPress={this.onLocatePress}>
          <Icon
            name="my-location"
            type="MaterialIcons"
            style={{ color: 'gray' }}
          />
        </Fab>
        <Fab
          delayPressIn={0}
          style={styles.startButton}
          position="bottomRight"
          onPress={
            this.props.isNavigating ? this.stopNavigating : this.startNavigating
          }>
          <Icon name={this.props.isNavigating ? 'pause' : 'play'} />
        </Fab>
        <MapView
          style={{ flex: 1, alignSelf: 'stretch' }}
          initialRegion={{
            latitude: this.state.currentLocation.latitude,
            longitude: this.state.currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={(c) => (this.mapView = c)}
          showsUserLocation>
          {this.props.location && (
            <NavigationRoute
              currentLocation={this.state.currentLocation}
              destination={{
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
              }}
              onReady={this.fitToCoordinates}
              radius={RANGE_VALUES[this.props.rangeOption]}
            />
          )}
          {this.props.stationType !== NONE && (
            <StationMarkers
              type={this.props.stationType}
              onStationPress={this.onStationPress}
            />
          )}
        </MapView>
      </Container>
    );
  }

  componentDidMount() {
    //Reset destination location
    this.props.changeLocation(null);
    this.props.changeStationType(NONE);
    this.props.stopNavigating();
    BackgroundGeolocation.getCurrentLocation((location) => {
      this.setState({ currentLocation: location });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.isNavigating &&
      JSON.stringify(prevState.currentLocation) !==
        JSON.stringify(this.state.currentLocation)
    ) {
      if (this.isInRange()) {
        if (!this.state.isNotifying) {
          this.raiseAlarm();
          this.setState({ isNotifying: true });
        }
      }
    }
  }

  componentWillUnmount() {
    this.stopBackgroundGeolocation();

    // unregister all event listeners
    BackgroundGeolocation.events.forEach((event) =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  onStationPress(marker) {
    const station = {
      name: marker.title,
      address: marker.title,
      latitude: marker.lat,
      longitude: marker.lng,
    };
    this.props.changeLocation(station);
    this.props.changeStationType(NONE);
  }

  getLocationString() {
    const location = this.props.location;
    if (location) {
      if (location.address.includes(location.name)) {
        return location.address;
      }
      return `${this.props.location.name}, ${this.props.location.address}`;
    }
    return 'Search...';
  }

  startNavigating() {
    if (this.props.isNavigating) {
      Toast.show({
        text: 'Alarm has already been set!',
        buttonText: 'Okay',
        duration: 3000,
      });
    } else if (!this.props.location) {
      Toast.show({
        text: 'Please select a destination',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000,
      });
    } else {
      this.startBackgroundGeolocation();
      this.props.startNavigating();
      this.isFitted = false;

      Toast.show({
        text: 'Alarm set!',
        buttonText: 'Okay',
        type: 'success',
        duration: 3000,
      });
    }
  }

  stopNavigating() {
    if (!this.props.isNavigating) {
      Toast.show({
        text: 'Alarm has already stopped!',
        buttonText: 'Okay',
        duration: 3000,
      });
    } else if (!this.props.location) {
      console.warn(
        "[WARN] There is no location but 'isNavigating' is true. Turning off..."
      );
      this.props.stopNavigating();
    } else {
      //Fit to coornidate in another address
      this.isFitted = false;
      //immediately stop sound alarm
      ReactNativeAN.stopAlarm();

      this.stopBackgroundGeolocation();
      this.props.stopNavigating();

      Toast.show({
        text: 'Alarm stopped!',
        buttonText: 'Okay',
        type: 'success',
        duration: 3000,
      });
    }
  }

  fitToCoordinates(result) {
    if (!this.isFitted) {
      this.isFitted = true;

      this.mapView.fitToCoordinates(result.coordinates, {
        edgePadding: {
          right: Layout.window.width / 20,
          bottom: Layout.window.height / 20,
          left: Layout.window.width / 20,
          top: Layout.window.height / 20,
        },
        animated: true,
      });
    }
  }

  onSearchPress() {
    this.props.navigation.navigate('DetailExplore');
  }

  async onPickPress() {
    let location = null;
    await RNGooglePlaces.openPlacePickerModal()
      .then((place) => {
        location = place;
        console.info('[INFO] onPickPress SUCCESS:', location.address);
      })
      .catch((error) => console.error('[ERROR] onPickPress', error));

    if (location == null) {
      console.info(
        '[INFO] onPickPress Unable to find location from result item.'
      );
      Toast.show({
        text: 'Unable to pick destination.',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    this.props.changeLocation(location);
  }

  onLocatePress() {
    this.mapView.fitToCoordinates([this.state.currentLocation]);
  }

  onRangePress() {
    showRangeOptions(this.props.rangeOption, (selectedIndex) => {
      if (selectedIndex !== undefined && selectedIndex !== null) {
        this.props.setRangeOption(selectedIndex);
      }
    });
  }

  isInRange() {
    if (!this.props.location) {
      console.error('[ERROR] checkToAlarm No location.');
      return;
    }

    const current = this.state.currentLocation;
    const destination = this.props.location;
    const distance = computeDistanceBetween(
      current.latitude,
      current.longitude,
      destination.latitude,
      destination.longitude
    );

    return distance <= RANGE_VALUES[this.props.rangeOption];
  }

  raiseAlarm() {
    //PUSH NOTIFICATIONS
    //ALARM
    const alarmNotifData = this.configAlarmNotification();
    ReactNativeAN.sendNotification(alarmNotifData);
    this.isFitted = false; // Will be fit direction in new address
    this.props.navigation.navigate('Alarm');
    console.info('[INFO] Send notification successfully');
  }

  configBackgroundGeolocation() {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationsEnabled: true,
      notificationTitle: 'Location Notifier',
      notificationText: 'Location Notifier is tracking your location.',
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 4000,
      fastestInterval: 4000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task

      //get current location
      this.setState({ currentLocation: location });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.info(
        '[INFO] BackgroundGeolocation authorization status: ' + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.warn('[WARN] No Pressed.'),
                  style: 'cancel',
                },
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.info('[INFO] BackgroundGeolocation is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.info('[INFO] BackgroundGeolocation is in foreground');
    });
  }

  startBackgroundGeolocation() {
    console.info('[INFO] Starting BackgroundGeolocation.');
    BackgroundGeolocation.checkStatus((status) => {
      console.info(
        '[INFO] BackgroundGeolocation status:',
        JSON.stringify(status)
      );

      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
        console.info('[INFO] Started.');
      }
    });
  }

  stopBackgroundGeolocation() {
    console.info('[INFO] Stopping BackgroundGeolocation.');
    BackgroundGeolocation.checkStatus((status) => {
      console.info(
        '[INFO] BackgroundGeolocation status:',
        JSON.stringify(status)
      );

      if (status.isRunning) {
        BackgroundGeolocation.stop();
        console.info('[INFO] Stopped.');
      }
    });
  }

  configAlarmNotification() {
    const soundName = 'alarm' + this.props.soundID + '.mp3';
    const alarmNotifData = {
      id: '1997',
      title: 'Location Notifier',
      message: "You're IN",
      channel: '1997', // Required. Same id as specified in MainApplication's onCreate method
      ticker: "Let's make a favorites",
      vibrate: this.props.vibrate,
      vibration: 3000,
      small_icon: 'ic_launcher',
      large_icon: 'ic_launcher',
      play_sound: true,
      sound_name: soundName, // Plays custom notification ringtone if sound_name: null
      color: 'red',
    };
    return alarmNotifData;
  }
}

const styles = StyleSheet.create({
  shrink: {
    flex: 0,
  },
  addressBar: {
    zIndex: 1,
    position: 'absolute',
    top: 10 + Layout.statusBarHeight,
    left: 10,
    right: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  pickButton: {
    alignSelf: 'center',
    marginLeft: -5,
  },
  startButton: {
    zIndex: 1,
    backgroundColor: Colors.tintColor,
  },
  myLocationButton: {
    zIndex: 1,
    backgroundColor: 'white',
    bottom: 75,
  },
  rangeButton: {
    zIndex: 1,
    backgroundColor: 'white',
    bottom: 150,
  },
});

const mapStateToProps = (state) => ({
  location: state.exploreReducer.location,
  rangeOption: state.settingsReducer.rangeOption,
  soundID: state.settingsReducer.soundID,
  isNavigating: state.exploreReducer.isNavigating,
  vibrate: state.settingsReducer.vibrate,
  stationType: state.exploreReducer.stationType,
});

const mapDispatchToProps = (dispatch) => ({
  setRangeOption: (optionID) => dispatch(setRangeOption(optionID)),
  stopNavigating: () => dispatch(stopNavigating()),
  startNavigating: () => dispatch(startNavigating()),
  changeLocation: (location) => dispatch(changeLocation(location)),
  changeStationType: (type) => dispatch(changeStationType(type)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainExploreScreen)
);
