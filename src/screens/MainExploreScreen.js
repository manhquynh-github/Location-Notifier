import { Button, Container, Content, Fab, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  View,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setRangeOption } from '../actions';
import showRangeOptions from '../components/RangeOptions';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MapView } from 'expo';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import DestinationDirect from '../components/DestinationDirect';
import { RANGE_VALUES } from '../constants/RangeOptions';
import { propTypes as LocationProps } from '../model/Location';
import { stopDirect } from '../actions/ExploreActions';
import RNGooglePlaces from 'react-native-google-places';
import { changeLocation } from '../actions/ExploreActions';

class MainExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.shape(LocationProps),
    rangeOption: PropTypes.number.isRequired,
    setRangeOption: PropTypes.func.isRequired,
    stopDirect: PropTypes.func.isRequired,
    isDirect: PropTypes.bool,
    changeLocation: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      currentLocation: {
        latitude: 10.8703,
        longitude: 106.8034513,
      },
      distance: null,
    };

    this.mapView = null;
    this.isFitted = false;

    this.onSearchPress = this.onSearchPress.bind(this);
    this.onPickPress = this.onPickPress.bind(this);
    this.onLocatePress = this.onLocatePress.bind(this);
    this.onRangePress = this.onRangePress.bind(this);
    this.fitToCoordinates = this.fitToCoordinates.bind(this);
    this.calcCrow = this.calcCrow.bind(this);
    this.toRad = this.toRad.bind(this);
    this.checkToAlarm = this.checkToAlarm.bind(this);
    this.fitToCurrentCoordinates = this.fitToCurrentCoordinates.bind(this);
    this.setCancelOrStart = this.setCancelOrStart.bind(this);
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
          style={styles.myLocationButton}
          position="bottomRight"
          onPress={this.fitToCurrentCoordinates}>
          <Icon
            name="my-location"
            type="MaterialIcons"
            style={{ color: 'gray' }}
          />
        </Fab>
        <Fab
          style={styles.startButton}
          position="bottomRight"
          onPress={this.setCancelOrStart}>
          <Icon name="play" />
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
          {this.props.isDirect && this.props.location && (
            <DestinationDirect
              currentLocation={this.state.currentLocation}
              destination={{
                latitude: this.props.location.latitude,
                longitude: this.props.location.longitude,
              }}
              fitToCoordinates={this.fitToCoordinates}
              checkAlarm={this.checkToAlarm}
              range={this.props.rangeOption}
            />
          )}
        </MapView>
      </Container>
    );
  }
  setCancelOrStart() {
    //Just handle cancel
    this.isFitted = false;
    this.props.stopDirect();
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

  fitToCurrentCoordinates() {
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

  onSearchPress() {
    this.props.navigation.navigate('DetailExplore');
  }

  async onPickPress() {
    let location = null;
    await RNGooglePlaces.openPlacePickerModal()
      .then((place) => {
        location = place;
        console.log('SUCCESS'+location.address);
      })
      .catch(error => console.log('ERRORRRRRRRRR'));

    if (location == null) {
      console.log('Unable to find location from result item.');
      ToastAndroid.show("ERROR", ToastAndroid.SHORT);
      return;
    }

    this.props.changeLocation(location);
  }

  onLocatePress() {}

  onRangePress() {
    showRangeOptions(this.props.rangeOption, (selectedIndex) => {
      if (selectedIndex !== undefined) {
        this.props.setRangeOption(selectedIndex);
      }
    });
  }

  componentDidMount() {
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
      interval: 5000,
      fastestInterval: 5000,
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
    })
  }

  componentWillUnmount() {
    //return;

    // unregister all event listeners
    BackgroundGeolocation.events.forEach((event) =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  checkToAlarm() {
    const current = this.state.currentLocation;
    const des = this.props.location;
    const distance = this.calcCrow(
      current.latitude,
      current.longitude,
      des.latitude,
      des.longitude
    );
    if (distance <= RANGE_VALUES[this.props.rangeOption]) {
      //PUSH NOTIFICATIONS
      //ALARM
      //Stop direct
      this.props.stopDirect();
      this.isFitted = false; // Fit direction in new address
    }
  }

  //Calculate distance between two coordinate to meters //BIRD BAY -- CHim bay
  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value) {
    return (Value * Math.PI) / 180;
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
  isDirect: state.exploreReducer.isDirect,
});

const mapDispatchToProps = (dispatch) => ({
  setRangeOption: (optionID) => dispatch(setRangeOption(optionID)),
  stopDirect: () => dispatch(stopDirect()),
  changeLocation: (location) => dispatch(changeLocation(location)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainExploreScreen)
);
