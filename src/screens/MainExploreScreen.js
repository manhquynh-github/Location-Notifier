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

class MainExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    rangeOption: PropTypes.number.isRequired,
    setRangeOption: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onSearchPress = this.onSearchPress.bind(this);
    this.onLocatePress = this.onLocatePress.bind(this);
    this.onRangePress = this.onRangePress.bind(this);
  }

  render() {
    return (
      <Container>
        <Button full onPress={this.onSearchPress} style={styles.addressBar}>
          <Text uppercase={false} style={{ color: Colors.darkGray }}>
            {this.props.location === '' ? 'Search...' : this.props.searchQuery}
          </Text>
        </Button>
        <Fab
          active={false}
          containerStyle={{}}
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
          containerStyle={{}}
          style={styles.myLocationButton}
          position="bottomRight">
          <Icon
            name="my-location"
            type="MaterialIcons"
            style={{ color: 'gray' }}
          />
        </Fab>
        <Fab
          containerStyle={{}}
          style={styles.startButton}
          position="bottomRight">
          <Icon name="play" />
        </Fab>
        <MapView
          style={{ flex: 1, alignSelf: 'stretch' }}
          initialRegion={{
            latitude: 10.8703,
            longitude: 106.8034513,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
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
