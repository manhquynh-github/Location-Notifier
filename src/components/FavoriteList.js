import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import FavoriteListItem from '../components/FavoriteListItem';

export default class FavoriteList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        coordinates: PropTypes.array.isRequired,
        locationName: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    onRemovePress: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onRemovePress = this.onRemovePress.bind(this);
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.onRenderItem}
        keyExtractor={this.onKeyExtractor}
      />
    );
  }

  onRenderItem({ item, index }) {
    return (
      <FavoriteListItem
        title={item.title}
        locationName={item.locationName}
        onRemovePress={() => this.onRemovePress(item)}
      />
    );
  }

  onKeyExtractor(item, index) {
    return `favorite-item-${index}`;
  }

  onRemovePress(item) {
    if (this.props.onRemovePress) {
      this.props.onRemovePress(item);
    }
  }
}
