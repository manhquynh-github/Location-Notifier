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
    onChangeSave: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    onPress: undefined,
    onChangeSave: undefined,
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
    if (item.sourceType === 'favorite') {
      return (
        <ResultListItem
          label={item.value.label}
          address={item.value.address}
          saved={true}
          onPress={() => this.onPress(item)}
          onChangeSave={() => this.onChangeSave(item)}
        />
      );
    } else if (item.sourceType === 'google') {
      return (
        <ResultListItem
          label={item.value.primaryText}
          address={item.value.fullText}
          saved={false}
          onPress={() => this.onPress(item)}
          onChangeSave={() => this.onChangeSave(item)}
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

  onChangeSave(item) {
    if (this.props.onChangeSave) {
      this.props.onChangeSave(item);
    }
  }
}
