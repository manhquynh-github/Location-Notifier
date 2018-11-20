import { Button, Container, Content, Fab, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setRangeOption } from '../actions';
import showRangeOptions from '../components/RangeOptions';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { MapView } from 'expo';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBoQ_yAZYFKQByAhL8USTlHuV6NGIJTsig';

class MainExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    rangeOption: PropTypes.number.isRequired,
    setRangeOption: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      currentLocation:{
        latitude: 10.8703,
        longitude: 106.8034513
      }
    }


    this.onSearchPress = this.onSearchPress.bind(this);
    this.onLocatePress = this.onLocatePress.bind(this);
    this.onRangePress = this.onRangePress.bind(this);
  }

  render() {
    return (
      <Container>
        <Button
          full
          onPress={this.onSearchPress}
          style={styles.addressBar}
          delayPressIn={0}>
          <Text uppercase={false} style={{ color: Colors.darkGrayBackground }}>
            {this.props.location === '' ? 'Search...' : this.props.searchQuery}
          </Text>
        </Button>
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
        <Fab style={styles.myLocationButton} position="bottomRight">
          <Icon
            name="my-location"
            type="MaterialIcons"
            style={{ color: 'gray' }}
          />
        </Fab>
        <Fab style={styles.startButton} position="bottomRight">
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
        >{<MapViewDirections
                origin={this.state.currentLocation}
                destination={{latitude: 10.866356,
                  longitude: 106.792509}}
                apikey={GOOGLE_MAPS_APIKEY}
        />}</MapView>
      </Container>
    );
  }

  onSearchPress() {
    this.props.navigation.navigate('DetailExplore');
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
      notificationsEnabled:true,
      notificationTitle: 'Location Notifier',
      notificationText: 'Location Notifier is tracking your locations',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://192.168.81.15:3000/location',
      httpHeaders: {
        'X-FOO': 'bar'
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar' // you can also add your own properties
      }
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        console.log(location);
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
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
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
});

const mapDispatchToProps = (dispatch) => ({
  setRangeOption: (optionID) => dispatch(setRangeOption(optionID)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainExploreScreen)
);
