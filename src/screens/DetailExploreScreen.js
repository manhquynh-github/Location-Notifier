import { Button, Container, Content, Icon, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/ExploreActions';
import { addFavorite, removeFavorite } from '../actions/FavoriteActions';
import ResultList from '../components/ResultList';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import { propTypes as LocationProps } from '../model/Location';

class DetailExploreScreen extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape(LocationProps)),
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    location: PropTypes.shape(LocationProps),
    changeLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: props.location
        ? `${this.props.location.name}, ${this.props.location.address}`
        : '',
      resultList: [],
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.search(this.props.location ? this.props.location.address : '');
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
            <ResultList data={this.state.resultList} onPress={this.onPress} />
          </View>
        </Content>
      </Container>
    );
  }

  onChangeText(e) {
    this.setState({
      location: e,
    });

    this.search(e);
  }

  onPress(item) {
    this.props.changeLocation(item);
    this.props.navigation.goBack();
  }

  search(value) {
    value = value.toLowerCase();
    const results = [];

    // Search in favorites
    for (let i = 0; i < this.props.favorites.length; i++) {
      const favorite = this.props.favorites[i];
      if (
        favorite.label.toLowerCase().includes(value) ||
        favorite.name.toLowerCase().includes(value) ||
        favorite.address.toLowerCase().includes(value)
      ) {
        results.push(favorite);
      }
    }

    this.setState({ resultList: results });
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
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (location) => dispatch(changeLocation(location)),
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  removeFavorite: (favoriteID) => dispatch(removeFavorite(favoriteID)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailExploreScreen)
);
