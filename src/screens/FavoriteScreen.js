import { Container, Content, Text, List } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/Favorite';
import PropTypes from 'prop-types';
import FavoriteListItem from '../components/FavoriteListItem';

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
  }

  constructor() {
    super();
    this.onRemovePressed = this.onRemovePressed.bind(this);
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.renderFavorites()}
          </List>
        </Content>
      </Container>
    );
  }

  renderFavorites() {
    return this.props.favorites.map((e, i) => (
      <FavoriteListItem
        key={`favorite-item-${i}`}
        title={e.title}
        locationName={e.locationName}
        onRemovePressed={() => this.onRemovePressed(i)}
      />
    ));
  }

  onRemovePressed(index) {
    this.props.removeFavorite(this.props.favorites[index].id);
  }
}

const mapStateToProps = state => ({
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: favorite => dispatch(addFavorite(favorite)),
  removeFavorite: id => dispatch(removeFavorite(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);