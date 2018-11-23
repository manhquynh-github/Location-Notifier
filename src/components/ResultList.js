import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ResultListItem from './ResultListItem';
import { propTypes as LocationProps } from '../model/Location';
import { propTypes as SearchResultProps } from '../model/SearchResult';

export default class ResultList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        sourceType: PropTypes.oneOf(['google', 'favorite']),
        value: PropTypes.oneOfType([
          PropTypes.shape(LocationProps),
          PropTypes.shape(SearchResultProps),
        ]),
      })
    ),
    onPress: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    onPress: undefined,
  };

  constructor() {
    super();
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onPress = this.onPress.bind(this);
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
    if (item.sourceType === 'favorite') {
      return (
        <ResultListItem
          label={item.value.label}
          address={item.value.address}
          onPress={() => this.onPress(item)}
        />
      );
    } else if (item.sourceType === 'google') {
      return (
        <ResultListItem
          label={item.value.primaryText}
          address={item.value.fullText}
          onPress={() => this.onPress(item)}
        />
      );
    }
  }

  onKeyExtractor(item, index) {
    return `result-item-${index}`;
  }

  onPress(item) {
    if (this.props.onPress) {
      this.props.onPress(item);
    }
  }
}
