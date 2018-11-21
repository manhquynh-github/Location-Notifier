import { Button, Container, Content, Icon, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/ExploreActions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import ResultList from '../components/ResultList';

class DetailExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.string.isRequired,
    changeLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  render() {
    return (
      <Container>
        <Content style={styles.page}>
          <StatusBarOverlay />
          <Input
            value={this.state.location}
            style={styles.searchBar}
            placeholder="Search..."
            autoFocus={true}
            onChangeText={this.onChangeText}
          />
          <View style={styles.helperContainer}>
            <Button
              transparent
              bordered
              rounded
              iconLeft
              style={styles.helperItemContainer}
              androidRippleColor="lightgray"
              delayPressIn={0}>
              <Icon
                name="local-gas-station"
                type="MaterialIcons"
                style={styles.gasStationIcon}
              />
              <Text
                uppercase={false}
                style={{ color: Colors.darkGrayBackground }}>
                Gas Station
              </Text>
            </Button>
            <Button
              transparent
              bordered
              rounded
              iconLeft
              style={styles.helperItemContainer}
              androidRippleColor="lightgray"
              delayPressIn={0}>
              <Icon
                name="local-atm"
                type="MaterialIcons"
                style={styles.localAtmIcon}
              />
              <Text
                uppercase={false}
                style={{ color: Colors.darkGrayBackground }}>
                Local ATM
              </Text>
            </Button>
          </View>
          <View style={styles.resultList}>
            <ResultList
              data={[
                {
                  id: 0,
                  title: 'Home',
                  coordinates: [0, 0],
                  address: '123 Đường 456',
                },
                {
                  id: 1,
                  title: 'School',
                  coordinates: [0, 0],
                  address:
                    'Khu phố 6 P, Phường Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam',
                },
              ]}
              onPress={this.onPress}
            />
          </View>
        </Content>
      </Container>
    );
  }

  onChangeText(e) {
    this.setState({
      location: e,
    });
  }

  onPress(item) {}
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.lightGrayBackground,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  helperContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  helperItemContainer: {
    marginRight: 10,
    borderColor: '#ccc',
  },
  gasStationIcon: {
    color: '#2196f3',
  },
  localAtmIcon: {
    color: '#357a38',
  },
  resultList: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  location: state.exploreReducer.location,
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (query) => dispatch(changeLocation(query)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailExploreScreen)
);
