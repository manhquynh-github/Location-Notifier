import { Body, Button, Icon, ListItem, Text } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet,View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { MapView } from "expo";
import {RANGE_VALUES} from "../constants/RangeOptions"

const GOOGLE_MAPS_APIKEY = "AIzaSyBAGOnN-kkH26IFRwjFrciJ2LV4g0U8_eQ";

export default class DestinationDirect extends Component {
  static propTypes = {
    currentLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    }).isRequired,
    destination: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number
    }).isRequired,
    fitToCoordinates: PropTypes.func,
    range:PropTypes.number.isRequired
  };
  
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <MapViewDirections
          origin={this.props.currentLocation}
          destination={this.props.destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="hotpink"
          onReady={result => {
            this.fitToCoordinates(result);
          }}
        />
        <MapView.Marker
          coordinate={this.props.destination}
          title="Name"
          description="Hello man"
        />
        <MapView.Circle
          center={this.props.destination}
          radius={RANGE_VALUES[this.props.range]}
          strokeWidth={3}
        />
      </View>
    );
  }

  fitToCoordinates(result) {
    if (this.props.fitToCoordinates) {
      this.props.fitToCoordinates(result);
      console.log("range"+this.props.range);
    }
  }
}
