import {
  ActionSheet,
  Button,
  Container,
  Content,
  Fab,
  Icon,
  Text,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { setRangeOption } from '../actions';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { RANGE_OPTIONS } from '../constants/RangeOptions';

class MainExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.string,
    rangeOption: PropTypes.number,
    setRangeOption: PropTypes.func,
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
        <Content>
          <Image
            source={require('../assets/images/GoogleMapLogo.png')}
            style={{}}
          />
        </Content>
      </Container>
    );
  }

  onSearchPress() {
    this.props.navigation.navigate('DetailExplore');
  }

  onLocatePress() {}

  onRangePress() {
    this.showRangeOptions();
  }

  showRangeOptions() {
    // Generate new range options, where
    // only selected one has a check mark.
    const options = [];
    for (i = 0; i < RANGE_OPTIONS.length; i++) {
      // re-create one option
      let option = {};
      // set that one's text = old one
      const optionText = RANGE_OPTIONS[i];
      option['text'] = optionText;
      // if is selected one, set icon to
      // check mark and set color
      if (this.props.rangeOption == i) {
        option['icon'] = 'checkmark';
        option['iconColor'] = Colors.tintColor;
      }
      // push back to new option array
      options.push(option);
    }

    // show action sheet using newly created options
    ActionSheet.show(
      {
        options: options,
        title: 'Range to notify',
      },
      (selectedIndex) => {
        if (selectedIndex !== undefined) {
          this.props.setRangeOption(selectedIndex);
        }
      }
    );
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
