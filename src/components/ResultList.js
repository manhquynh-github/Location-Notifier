import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ResultListItem from './ResultListItem';
import { propTypes as LocationProps } from '../model/Location';

export default class ResultList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(LocationProps)),
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
    return (
      <ResultListItem
        label={item.label ? item.label : undefined}
        name={item.primaryText}
        address={item.fullText}
        onPress={() => this.onPress(item)}
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
}
