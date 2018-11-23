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
import RNGooglePlaces from 'react-native-google-places';

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
        ? `${this.props.location.primaryText}, ${this.props.location.fullText}`
        : '',
      resultList: [],
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSavePress = this.onSavePress.bind(this);
  }

  componentDidMount() {
    this.search(this.props.location ? this.props.location.fullText : '',[]);
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
            <ResultList data={this.state.resultList} onPress={this.onPress} onSavePress={this.onSavePress} />
          </View>
        </Content>
      </Container>
    );
  }

  onQueryChange(text) {
    let results = [];
    RNGooglePlaces.getAutocompletePredictions(text, {
      country: 'VN'
    })
      .then((places) => {
        results = places;
        this.search(text, results);
      })
      .catch(error => console.log(error.message));
  }

  onSelectSuggestion(placeID) {
    console.log(placeID);
    // getPlaceByID call here
    RNGooglePlaces.lookUpPlaceByID(placeID)
    .then((results) => console.log(results))
    .catch((error) => console.log(error.message));

    this.setState({
      showInput: false,
      predictions: []
    });
  }

  onChangeText(e) {
    this.setState({
      location: e,
    });
    this.onQueryChange(e);
  }

  onPress(item) {
    this.props.changeLocation(item);
    this.props.navigation.navigate('MainExplore');
  }
  onSavePress(item){
    const favorite={
      favoriteID: -1,
      placeID:item.placeID,
      name: item.primaryText,
      address: item.fullText,
    }
    this.props.addFavorite(favorite);
  }

  search(value, resultsQuery) {
    value = value.toLowerCase();
    let results =[];
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
    results = results.concat(resultsQuery);
    console.log(results);
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
