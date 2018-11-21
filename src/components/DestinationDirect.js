import { Body, Button, Icon, ListItem, Text } from "native-base";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { StyleSheet,View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { MapView } from "expo";

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
    FitToCoordinates: PropTypes.func
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
            this.FitToCoordinates(result);
          }}
        />
        <MapView.Marker
          coordinate={this.props.destination}
          title="Name"
          description="Hello man"
        />
      </View>
    );
  }

  FitToCoordinates(result) {
    if (this.props.FitToCoordinates) {
      this.props.FitToCoordinates(result);
      console.log("Fit To Coordinates")
    }
  }
}
