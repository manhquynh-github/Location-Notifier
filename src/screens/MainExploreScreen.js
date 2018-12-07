import { MapView } from 'expo';
import { Button, Container, Fab, Icon, Text, Toast } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
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
import DestinationDirect from '../components/DestinationDirect';
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
    };

    this.mapView = null;
    this.isFitted = false;

    this.onSearchPress = this.onSearchPress.bind(this);
    this.onPickPress = this.onPickPress.bind(this);
    this.onLocatePress = this.onLocatePress.bind(this);
    this.onRangePress = this.onRangePress.bind(this);
    this.fitToCoordinates = this.fitToCoordinates.bind(this);
    this.checkToAlarm = this.checkToAlarm.bind(this);
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
          {this.props.isNavigating && this.props.location && (
            <DestinationDirect
              currentLocation={this.state.currentLocation}
              destination={{
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
              }}
              fitToCoordinates={this.fitToCoordinates}
              //checkAlarm={this.checkToAlarm}
              range={this.props.rangeOption}
              isNavigating={this.props.isNavigating}
            />
          )}
          <StationMarkers
            type={this.props.stationType}
            onStationPress={this.onStationPress}
          />
        </MapView>
      </Container>
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
        text: 'Your alarm has already been set!',
        buttonText: 'Okay',
        duration: 3000,
      });
    } else if (!this.props.location) {
      Toast.show({
        text: 'Please select your destination',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000,
      });
    } else {
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
        text: 'Your alarm has already been cancelled!',
        buttonText: 'Okay',
        duration: 3000,
      });
    } else if (!this.props.location) {
      console.warn(
        "There's no location but 'isNavigating' is true. Turning off..."
      );
      this.stopNavigating();
    } else {
      //Fit to coornidate in another address
      this.isFitted = false;
      //immediately stop sound alarm
      ReactNativeAN.stopAlarm();
      //Turn of draw direction
      this.props.stopNavigating();
      Toast.show({
        text: 'Alarm cancelled!',
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
        console.log('SUCCESS' + location.address);
      })
      .catch((error) => console.log('ERRORRRRRRRRR'));

    if (location == null) {
      console.log('Unable to find location from result item.');
      ToastAndroid.show('ERROR', ToastAndroid.SHORT);
      return;
    }

    this.props.changeLocation(location);
  }

  onLocatePress() {
    const current = this.state.currentLocation;
    this.mapView.fitToCoordinates([current], {
      edgePadding: {
        right: Layout.window.width / 15,
        bottom: Layout.window.height / 15,
        left: Layout.window.width / 15,
        top: Layout.window.height / 15,
      },
      animated: true,
    });
  }

  onRangePress() {
    showRangeOptions(this.props.rangeOption, (selectedIndex) => {
      if (selectedIndex) {
        this.props.setRangeOption(selectedIndex);
      }
    });
  }

  componentDidMount() {
    //Reset destination location
    this.props.changeLocation(null);
    this.props.changeStationType(NONE);
    this.props.stopNavigating();

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationsEnabled: true,
      notificationTitle: 'Location Notifier',
      notificationText: 'Location Notifier is tracking your locations',
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
      BackgroundGeolocation.startTask((taskKey) => {
        //get current location
        const newState = this.state;
        const newLocation = location;
        newState.currentLocation = newLocation;
        this.setState(newState);

        this.checkToAlarm();

        BackgroundGeolocation.endTask(taskKey);
      });
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
      console.log(
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
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning
      );
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    BackgroundGeolocation.getCurrentLocation((location) => {
      const newState = this.state;
      newState.currentLocation.latitude = location.latitude;
      newState.currentLocation.longitude = location.longitude;

      this.setState(newState);
    });
  }

  componentWillUnmount() {
    //return;

    // unregister all event listeners
    BackgroundGeolocation.events.forEach((event) =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  checkToAlarm() {
    if (!this.props.isNavigating || !this.props.location) {
      //Have no destination
      return;
    }
    const current = this.state.currentLocation;
    const des = this.props.location;
    const distance = computeDistanceBetween(
      current.latitude,
      current.longitude,
      des.latitude,
      des.longitude
    );
    console.log('Checking to alarm');
    // Only check and push notifications once if your're inside range
    if (
      distance <= RANGE_VALUES[this.props.rangeOption] &&
      this.props.isNavigating
    ) {
      //PUSH NOTIFICATIONS
      //ALARM
      const alarmNotifData = this.configAlarmNotification();
      ReactNativeAN.sendNotification(alarmNotifData);

      //Stop direct
      //this.props.stopNavigating();
      this.isFitted = false; // Will be fit direction in new address

      console.log('Send notification successfully');
      this.props.navigation.navigate('Alarm');
    }
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
