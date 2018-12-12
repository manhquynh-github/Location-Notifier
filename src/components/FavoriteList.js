import { Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { propTypes as LocationProps } from '../model/Location';
import FavoriteListItem from './FavoriteListItem';

export default class FavoriteList extends Component {
  static propTypes = {
    /**
     * The data array to show in the list.
     */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The FavoriteID of this item.
         * Not to be confused with PlaceID (which is from Google Map API).
         */
        favoriteID: PropTypes.number.isRequired,
        /**
         * The label of this item.
         */
        label: PropTypes.string,
        /**
         * The location information of this item.
         */
        ...LocationProps,
      })
    ),
    /**
     * Event listener for when an item is pressed.
     */
    onPress: PropTypes.func,
    /**
     * Event listener for when an item is pressed and held.
     */
    onLongPress: PropTypes.func,
    /**
     * Event listenr for when an item's More (3 dots) button is pressed.
     */
    onMorePress: PropTypes.func,
  };

  static defaultProps = {
    data: [],
  };

  constructor() {
    super();
    this.state = {
      /**
       * Should the list update now.
       * Use refresh() to update.
       */
      refresh: false,
    };
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onMorePress = this.onMorePress.bind(this);
  }

  render() {
    if (this.props.data.length == 0) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/images/EmptyFavorite.png')}
            style={styles.emptyImage}
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
        extraData={this.state.refresh}
      />
    );
  }

  refresh() {
    this.setState({
      refresh: !this.state.refresh,
    });
  }

  onRenderItem({ item, index }) {
    return (
      <FavoriteListItem
        label={item.label}
        address={item.address}
        onPress={() => this.onPress(item)}
        onLongPress={() => this.onLongPress(item)}
        onMorePress={() => this.onMorePress(item)}
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

  onLongPress(item) {
    if (this.props.onLongPress) {
      this.props.onLongPress(item);
    }
  }

  onMorePress(item) {
    if (this.props.onMorePress) {
      this.props.onMorePress(item);
    }
  }
}

const styles = StyleSheet.create({
  /**
   * Styles for the container when there are no items.
   */
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  /**
   * Styles for the image indicating there are no items.
   */
  emptyImage: {
    height: 128,
    width: 128,
    marginBottom: 10,
  },
});
