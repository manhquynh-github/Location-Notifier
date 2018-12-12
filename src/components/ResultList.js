import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { propTypes as LocationProps } from '../model/Location';
import { propTypes as SearchResultProps } from '../model/SearchResult';
import ResultListItem from './ResultListItem';

export default class ResultList extends Component {
  static propTypes = {
    /**
     * The data array to show in the list.
     */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The result type of this item.
         * Must be one following:
         * - 'location': the item is an object which has a shape like
         * { name: string, address: string, latitude: number, longitude: number }.
         * - 'google': the item is retrieved from Google Autocomplete API.
         * - 'favorite': the item is from the favorite list.
         */
        type: PropTypes.oneOf(['location', 'google', 'favorite']),
        /**
         * The value of this item.
         * Must be one of the following:
         * - An object containing location information.
         * - An object containing information from Google Autocomplete API.
         */
        value: PropTypes.oneOfType([
          PropTypes.shape(LocationProps),
          PropTypes.shape(SearchResultProps),
        ]),
      })
    ),
    /**
     * Event listener for when an item is pressed.
     */
    onPress: PropTypes.func,
    /**
     * Event listener for when the Save toggle button, which adds an item to
     * favorite list, is changed.
     */
    onChangeSave: PropTypes.func,
  };

  static defaultProps = {
    data: [],
  };

  constructor() {
    super();
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onChangeSave = this.onChangeSave.bind(this);
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
    let label = '';
    let address = '';
    let saved = false;
    switch (item.type) {
      case 'favorite': {
        label = item.value.label;
        address = item.value.address;
        saved = true;
        break;
      }
      case 'google': {
        label = item.value.primaryText;
        address = item.value.fullText;
        break;
      }
      case 'location': {
        label = item.value.name;
        address = item.value.address;
        break;
      }
    }

    return (
      <ResultListItem
        label={label}
        address={address}
        saved={saved}
        onPress={() => this.onPress(item)}
        onChangeSave={() => this.onChangeSave(item)}
      />
    );
  }

  onKeyExtractor(item, index) {
    return `result-item-${index}`;
  }

  onPress(item) {
    if (this.props.onPress) {
      this.props.onPress(item);
    }
  }

  onChangeSave(item) {
    if (this.props.onChangeSave) {
      this.props.onChangeSave(item);
    }
  }
}
