import { MapView } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { atmRef, gasRef } from '../config/FirebaseConfig';
import { NONE, ATM, GAS } from '../constants/StationTypes';

export default class StationMarkers extends Component {
  static propTypes = {
    type: PropTypes.oneOf([ATM, GAS, NONE]),
    onStationPress: PropTypes.func,
  };

  static defaultProps = { type: NONE };

  constructor() {
    super();
    this.initStations();
    this.initMarkerImages();
    this.onStationPress = this.onStationPress.bind(this);
  }

  render() {
    const type = this.props.type;
    if (type === NONE) {
      return null;
    }

    const markerImage = this.markerImages[type];

    return (
      <View>
        {this.stations[type].map((marker, index) => (
          <MapView.Marker
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
            title={marker.title}
            key={`marker-${type}-${index}`}
            image={markerImage}
            onCalloutPress={() => this.onStationPress(marker)}
          />
        ))}
      </View>
    );
  }

  initStations() {
    this.stations = {
      [ATM]: [
        {
          lng: 106.65259739999999,
          lat: 10.801465900000002,
          title: 'ATM VietComBank',
        },
      ],
      [GAS]: [
        {
          lng: 106.65259739999999,
          lat: 10.801465900000002,
          title: 'GAS station',
        },
      ],
    };

    const atmMarkers = atmRef.child('thuduc');
    atmMarkers.once('value').then(
      (markers) => {
        const results = markers.val();
        if (results != null) {
          this.stations[ATM] = results;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    const gasMarkers = gasRef.child('thuduc');
    gasMarkers.once('value').then(
      (markers) => {
        const results = markers.val();
        if (results != null) {
          this.stations[GAS] = results;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initMarkerImages() {
    this.markerImages = {
      [ATM]: require('../assets/images/atm.png'),
      [GAS]: require('../assets/images/gasstation.png'),
    };
  }

  onStationPress(marker) {
    if (this.props.onStationPress) {
      this.props.onStationPress(marker);
    }
  }
}
