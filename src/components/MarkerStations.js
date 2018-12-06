import { MapView } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { atmRef, gasRef } from '../config/FirebaseConfig';
import { ATM_STATION, GAS_STATION } from '../constants/ActionTypes';

export default class MarkerStations extends Component {
  static propTypes = {
    stationType: PropTypes.number.isRequired,
    onStationPress: PropTypes.func,
  };

  constructor() {
    super();

    this.arrATM = [
      {
        lng: 106.65259739999999,
        lat: 10.801465900000002,
        title: 'ATM VietComBank',
      },
    ];
    const atmMarkers = atmRef.child('thuduc');
    atmMarkers.once('value').then(
      (markers) => {
        this.arrATM = markers.val();
      },
      (error) => {
        console.log(error);
      }
    );

    this.gasStations = [
      {
        lng: 106.65259739999999,
        lat: 10.801465900000002,
        title: 'GAS station',
      },
    ];
    const gasMarkers = gasRef.child('thuduc');
    atmMarkers.once('value').then(
      (markers) => {
        this.gasStations = markers.val();
      },
      (error) => {
        console.log(error);
      }
    );

    this.onStationPress = this.onStationPress.bind(this);
  }

  renderAtm = () => {
    return (
      this.arrATM &&
      this.arrATM.lenght != 0 &&
      this.arrATM.map((marker, index) => (
        <MapView.Marker
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          title={marker.title}
          key={index}
          image={require('../assets/images/atm.png')}
          onCalloutPress={() => this.onStationPress(marker)}
        />
      ))
    );
  };
  renderGas = () => {
    return (
      this.gasStations &&
      this.gasStations.lenght != 0 &&
      this.gasStations.map((marker, index) => (
        <MapView.Marker
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          title={marker.title}
          key={index}
          image={require('../assets/images/gasstation.png')}
          onCalloutPress={() => this.onStationPress(marker)}
        />
      ))
    );
  };

  render() {
    const stations = this.props.stationType;
    return (
      <View>
        {stations === ATM_STATION ? this.renderAtm() : <View />}
        {stations === GAS_STATION ? this.renderGas() : <View />}
      </View>
    );
  }

  onStationPress(marker) {
    if (this.props.onStationPress) {
      this.props.onStationPress(marker);
    }
  }
}
