import { Button, Container, Content, Icon, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/ExploreActions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';

class DetailExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.string,
    changeLocation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  render() {
    return (
      <Container>
        <Content style={styles.page}>
          <StatusBarOverlay />
          <Input
            value={this.state.location}
            style={styles.searchBar}
            placeholder="Search"
            autoFocus={true}
            onChangeText={this.onChangeText}
          />
          <View style={styles.helperContainer}>
            <Button
              transparent
              bordered
              rounded
              iconLeft
              style={styles.helperItemContainer}>
              <Icon
                name="local-gas-station"
                type="MaterialIcons"
                style={{ color: '#2196f3' }}
              />
              <Text uppercase={false} style={{ color: Colors.darkGray }}>
                Gas Station
              </Text>
            </Button>
            <Button
              transparent
              bordered
              rounded
              iconLeft
              style={styles.helperItemContainer}>
              <Icon
                name="local-atm"
                type="MaterialIcons"
                style={{ color: '#357a38' }}
              />
              <Text uppercase={false} style={{ color: Colors.darkGray }}>
                Local ATM
              </Text>
            </Button>
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
    borderWidth: 1,
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
    borderColor: Colors.darkGray,
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
