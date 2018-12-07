import { MapView } from 'expo';
import { Toast } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NetInfo, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { APIKEY } from '../config/GoogleMapConfig';

export default class NavigationRoute extends Component {
  static propTypes = {
    currentLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    destination: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    radius: PropTypes.number.isRequired,
    onReady: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      isConnected: false,
    };

    this.onReady = this.onReady.bind(this);
    this.onNetConnectivityChange = this.onNetConnectivityChange.bind(this);
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.onNetConnectivityChange
    );
  }

  render() {
    return (
      <View>
        {this.state.isConnected && (
          <MapViewDirections
            origin={this.props.currentLocation}
            destination={this.props.destination}
            apikey={APIKEY}
            strokeWidth={4}
            strokeColor="hotpink"
            onReady={this.onReady}
          />
        )}
        <MapView.Marker
          coordinate={this.props.destination}
          title="Destination"
          description="Destination"
        />
        <MapView.Circle
          center={this.props.destination}
          radius={this.props.radius}
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
      this.setState({ isConnected: isConnected });
    });
  }

  onNetConnectivityChange(isConnected) {
    this.setState({ isConnected: isConnected });
    console.info('[INFO] Network availability:', isConnected);
  }

  onReady(result) {
    if (this.props.onReady) {
      this.props.onReady(result);
    }
  }
}
