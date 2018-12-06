import { Body, Button, Icon, ListItem, Text, Toast } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, NetInfo } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { MapView } from 'expo';
import { RANGE_VALUES } from '../constants/RangeOptions';
import { primaryRBGA, primary } from '../constants/Colors';
const GOOGLE_MAPS_APIKEY = 'AIzaSyBAGOnN-kkH26IFRwjFrciJ2LV4g0U8_eQ';

export default class DestinationDirect extends Component {
  static propTypes = {
    currentLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    destination: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    fitToCoordinates: PropTypes.func,
    checkAlarm: PropTypes.func,
    range: PropTypes.number.isRequired,
    isNavigating: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isConnected: false,
    };

    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(
      this
    );
  }

  render() {
    console.log('internet: ' + this.state.isConnected);

    return (
      <View>
        {this.state.isConnected && (
          <MapViewDirections
            origin={this.props.currentLocation}
            destination={this.props.destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="hotpink"
            onReady={(result) => {
              this.fitToCoordinates(result);
            }}
          />
        )}
        <MapView.Marker
          coordinate={this.props.destination}
          title="Destination"
          description="Hello man"
        />
        <MapView.Circle
          center={this.props.destination}
          radius={RANGE_VALUES[this.props.range]}
          strokeWidth={3}
          strokeColor="#2196f3"
          fillColor="rgba(33, 150, 243, 0.2)"
        />
      </View>
    );
  }

  componentDidMount() {
    //Network
    NetInfo.isConnected.fetch().then((isConnected) => {
      const connectState = this.state;
      connectState.isConnected = isConnected;
      this.setState(connectState);
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange(isConnected) {
    const connectState = this.state;
    console.log(isConnected);
    connectState.isConnected = isConnected;
    this.setState(connectState);
    if (!isConnected) {
      if (this.props.isNavigating)
        Toast.show({
          text: 'Still navigating offline',
          buttonText: 'Okay',
          type: 'warning',
          duration: 2000,
        });
      else
        Toast.show({
          text: "Internet's not availabel",
          buttonText: 'Okay',
          type: 'warning',
          duration: 2000,
        });
    }
  }

  fitToCoordinates(result) {
    if (this.props.fitToCoordinates) {
      // && this.props.checkAlarm) {
      this.props.fitToCoordinates(result);
      //this.props.checkAlarm();
    }
  }
}
