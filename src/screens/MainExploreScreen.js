import { Button, Container, Content, Fab, Icon, Text } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, StyleSheet, Dimensions, ToastAndroid } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { setRangeOption } from "../actions";
import showRangeOptions from "../components/RangeOptions";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { MapView } from "expo";
import BackgroundGeolocation from "react-native-mauron85-background-geolocation";
import MapViewDirections from "react-native-maps-directions";
var { height, width } = Dimensions.get("window");
import DestinationDirect from "../components/DestinationDirect";
import {RANGE_VALUES} from "../constants/RangeOptions"
import { propTypes as LocationProps } from '../model/Location';



class MainExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.shape(LocationProps),
    rangeOption: PropTypes.number.isRequired,
    setRangeOption: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      currentLocation: {
        latitude: 10.8703,
        longitude: 106.8034513
      },
      destination: {
        latitude: 10.866356,
        longitude: 106.792509
      },
      distance: null
    };

    this.mapView = null;

    this.onSearchPress = this.onSearchPress.bind(this);
    this.onLocatePress = this.onLocatePress.bind(this);
    this.onRangePress = this.onRangePress.bind(this);
    this.fitToCoordinates = this.fitToCoordinates.bind(this);
    this.calcCrow =this.calcCrow.bind(this);
    this.toRad = this.toRad.bind(this);
  }

  render() {
    return (
      <Container>
        <Button
          full
          onPress={this.onSearchPress}
          style={styles.addressBar}
          delayPressIn={0}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            uppercase={false}
            style={{ color: Colors.darkGrayBackground }}>
            {this.props.location
              ? `${this.props.location.name}, ${this.props.location.address}`
              : 'Search...'}
          </Text>
        </Button>
        <Fab
          active={false}
          style={styles.rangeButton}
          position="bottomRight"
          onPress={this.onRangePress}
        >
          <Icon
            name="street-view"
            type="FontAwesome"
            style={{ color: "gray" }}
          />
        </Fab>
        <Fab style={styles.myLocationButton} position="bottomRight">
          <Icon
            name="my-location"
            type="MaterialIcons"
            style={{ color: "gray" }}
          />
        </Fab>
        <Fab style={styles.startButton} position="bottomRight">
          <Icon name="play" />
        </Fab>
        <MapView
          style={{ flex: 1, alignSelf: "stretch" }}
          initialRegion={{
            latitude: this.state.currentLocation.latitude,
            longitude: this.state.currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          ref={c => (this.mapView = c)}
          showsUserLocation
          showsMyLocationButton
        ><DestinationDirect
          currentLocation={this.state.currentLocation}
          destination={this.state.destination}
          fitToCoordinates={this.fitToCoordinates}
          range={this.props.rangeOption}
        /></MapView>
      </Container>
    );
  }
  fitToCoordinates(result) {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20
      },
      animated: true
    });

    this.checkToAlarm();
  }

  onSearchPress() {
    this.props.navigation.navigate("DetailExplore");
  }

  onLocatePress() {}

  onRangePress() {
    showRangeOptions(this.props.rangeOption, selectedIndex => {
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
      notificationTitle: "Location Notifier",
      notificationText: "Location Notifier is tracking your locations",
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false
    });

    BackgroundGeolocation.on("location", location => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(taskKey => {
        //get current location
        const newState = this.state;
        const newLocation = location;
        newState.currentLocation = newLocation;
        this.setState(newState);

        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on("stationary", stationaryLocation => {
      // handle stationary locations here
      Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on("error", error => {
      console.log("[ERROR] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("start", () => {
      console.log("[INFO] BackgroundGeolocation service has been started");
    });

    BackgroundGeolocation.on("stop", () => {
      console.log("[INFO] BackgroundGeolocation service has been stopped");
    });

    BackgroundGeolocation.on("authorization", status => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              "App requires location tracking permission",
              "Would you like to open app settings?",
              [
                {
                  text: "Yes",
                  onPress: () => BackgroundGeolocation.showAppSettings()
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel"
                }
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on("background", () => {
      console.log("[INFO] App is in background");
    });

    BackgroundGeolocation.on("foreground", () => {
      console.log("[INFO] App is in foreground");
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log(
        "[INFO] BackgroundGeolocation service is running",
        status.isRunning
      );
      console.log(
        "[INFO] BackgroundGeolocation services enabled",
        status.locationServicesEnabled
      );
      console.log(
        "[INFO] BackgroundGeolocation auth status: " + status.authorization
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
  }

  componentWillUnmount() {
    // unregister all event listeners
    BackgroundGeolocation.events.forEach(event =>
      BackgroundGeolocation.removeAllListeners(event)
    );
  }

  checkToAlarm() {
    const current = this.state.currentLocation;
    const des = this.state.destination;
    const distance = this.calcCrow(current.latitude,current.longitude,des.latitude,des.longitude);
    if(distance<=RANGE_VALUES[this.props.rangeOption]){
        //PUSH NOTIFICATIONS
        //ALARM
        console.log("YOU ARE IN")
    }
    console.log("DISTANCE"+distance);
  }

  //Calculate distance between two coordinate to meters //BIRD BAY -- CHim bay
  calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value) {
    return Value * Math.PI / 180;
  }
}

const styles = StyleSheet.create({
  shrink: {
    flex: 0
  },
  addressBar: {
    zIndex: 1,
    position: "absolute",
    top: 10 + Layout.statusBarHeight,
    left: 10,
    right: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "white"
  },
  startButton: {
    zIndex: 1,
    backgroundColor: Colors.tintColor
  },
  myLocationButton: {
    zIndex: 1,
    backgroundColor: "white",
    bottom: 75
  },
  rangeButton: {
    zIndex: 1,
    backgroundColor: "white",
    bottom: 150
  }
});

const mapStateToProps = state => ({
  location: state.exploreReducer.location,
  rangeOption: state.settingsReducer.rangeOption
});

const mapDispatchToProps = dispatch => ({
  setRangeOption: optionID => dispatch(setRangeOption(optionID))
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainExploreScreen)
);
