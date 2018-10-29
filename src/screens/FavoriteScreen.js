import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/FavoriteActions';
import FavoriteList from '../components/FavoriteList';
import StatusBarOverlay from '../components/StatusBarOverlay';

class FavoriteScreen extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.array.isRequired,
        locationName: PropTypes.string.isRequired,
      }).isRequired
    ),
    addFavorite: PropTypes.func,
    removeFavorite: PropTypes.func,
  };

  constructor() {
    super();
    this.onRemovePress = this.onRemovePress.bind(this);
  }

  render() {
    return (
      <Container>
        <Content>
          <StatusBarOverlay />
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
