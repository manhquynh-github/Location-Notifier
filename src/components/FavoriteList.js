import { Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { propTypes as LocationProps } from '../model/Location';
import FavoriteListItem from './FavoriteListItem';

export default class FavoriteList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string,
        ...LocationProps,
      })
    ),
    onPress: PropTypes.func,
    onRemovePress: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    onPress: undefined,
    onRemovePress: undefined,
  };

  constructor() {
    super();
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onRemovePress = this.onRemovePress.bind(this);
  }

  render() {
    if (this.props.data.length == 0) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/images/EmptyFavorite.png')}
            style={styles.allDoneImage}
          />
          <Text>There's no favorite items!</Text>
          <Text>Let's add some more.</Text>
        </View>
      );
    }

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
        label={item.label}
        address={item.address}
        onPress={() => this.onPress(item)}
        onRemovePress={() => this.onRemovePress(item)}
      />
    );
  }

  onKeyExtractor(item, index) {
    return `favorite-item-${index}`;
  }

  onPress(item) {
    if (this.props.onPress) {
      this.props.onPress(item);
    }
  }

  onRemovePress(item) {
    if (this.props.onRemovePress) {
      this.props.onRemovePress(item);
    }
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  allDoneImage: {
    height: 128,
    width: 128,
    marginBottom: 10,
  },
});
