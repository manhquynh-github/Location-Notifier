import {
  Button,
  Container,
  Content,
  Icon,
  Input,
  Text,
  Toast,
} from 'native-base';
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
    this.onChangeSave = this.onChangeSave.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    this.search(this.props.location ? this.props.location.address : '');
  }

  render() {
    return (
      <Container>
        <Content style={styles.page}>
          <StatusBarOverlay />
          <View style={styles.searchBar}>
            <Input
              value={this.state.location}
              style={{ flex: 1 }}
              placeholder="Search..."
              autoFocus={true}
              onChangeText={this.onChangeText}
            />
            <Button
              delayPressIn={0}
              rounded
              icon
              transparent
              style={{ alignSelf: 'center', marginLeft: -5 }}
              androidRippleColor="lightgray"
              onPress={this.onClear}>
              <Icon name="close" style={{ color: '#000' }} />
            </Button>
          </View>
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
              data={this.state.resultList}
              onPress={this.onPress}
              onChangeSave={this.onChangeSave}
            />
          </View>
        </Content>
      </Container>
    );
  }

  onClear() {
    this.setState({
      location: '',
    });
  }

  onChangeText(e) {
    this.setState({
      location: e,
    });

    this.search(e);
  }

  onPress(item) {
    if (item.sourceType === 'favorite') {
      this.props.changeLocation(item.value);
      this.props.navigation.navigate('MainExplore');
    } else if (item.sourceType === 'google') {
      // TODO: Query google api for actual location
      // item.value has the same shape as src/model/SearchResult
    }
  }

  onChangeSave(item) {
    if (item.favoriteID === undefined) {
      this.props.addFavorite(item);
      this.showAddFavorites();
    } else if (item.favoriteID >= 0) {
      // remove favorite from reducer
      this.props.removeFavorite(item.favoriteID);
      // because result item is not implemented with redux yet,
      // its favoriteID must be manually removed
      item.favoriteID = undefined;
      this.showRemoveFavorites(item);
    }
  }

  showAddFavorites() {
    Toast.show({
      text: 'Added to Favorites!',
      buttonText: 'OK',
      buttonStyle: { color: Colors.primary },
      duration: 3000,
      type: 'success',
    });
  }

  showRemoveFavorites(item) {
    Toast.show({
      text: 'Removed from Favorites!',
      buttonText: 'OK',
      duration: 3000,
      type: 'danger',
    });
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
        results.push({ sourceType: 'favorite', value: favorite });
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
    paddingRight: 0,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    flexDirection: 'row',
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
