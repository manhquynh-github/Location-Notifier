import { Body, Container, Content, Header, Title } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/FavoriteActions';
import FavoriteList from '../components/FavoriteList';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';

class FavoriteScreen extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.array.isRequired,
        locationName: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    addFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onRemovePress = this.onRemovePress.bind(this);
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
        <Content>
          <FavoriteList
            data={this.props.favorites}
            onRemovePress={this.onRemovePress}
          />
        </Content>
      </Container>
    );
  }

  onRemovePress(item) {
    this.props.removeFavorite(item.id);
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (favorite) => dispatch(addFavorite(favorite)),
  removeFavorite: (id) => dispatch(removeFavorite(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteScreen);
