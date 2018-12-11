import { ActionSheet, Body, Container, Header, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/ExploreActions';
import { removeFavorite } from '../actions/FavoriteActions';
import FavoriteList from '../components/FavoriteList';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import { propTypes as LocationProps } from '../model/Location';

class FavoriteScreen extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape(LocationProps)),
    changeLocation: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
  };

  static defaultProps = {
    favorites: [],
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onMorePress = this.onMorePress.bind(this);

    this.willFocus = props.navigation.addListener('willFocus', () => {
      this.favoriteList.refresh();
    });
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.header} noLeft>
          <Body>
            <Title>Favorites</Title>
          </Body>
        </Header>
        <FavoriteList
          ref={(ref) => {
            this.favoriteList = ref;
          }}
          data={this.props.favorites}
          onPress={this.onPress}
          onMorePress={this.onMorePress}
        />
      </Container>
    );
  }

  componentWillUnmount() {
    this.willFocus.remove();
  }

  onPress(item) {
    this.props.changeLocation(item);
    this.props.navigation.navigate('MainExplore');
  }

  onMorePress(item) {
    this.showActionOptions(item);
  }

  showActionOptions(item) {
    ActionSheet.show(
      {
        options: actionOptions,
        title: 'Edit favorite',
        destructiveButtonIndex: 1,
      },
      (selectedIndex) => {
        if (selectedIndex == 0) {
          this.props.navigation.navigate('EditFavorite', {
            item: item,
          });
        } else if (selectedIndex == 1) {
          this.props.removeFavorite(item.favoriteID);
        }
      }
    );
  }
}

const actionOptions = [
  { text: 'Edit label', icon: 'create' },
  { text: 'Delete', icon: 'trash', iconColor: 'red' },
];

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (location) => dispatch(changeLocation(location)),
  removeFavorite: (favoriteID) => dispatch(removeFavorite(favoriteID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteScreen);
