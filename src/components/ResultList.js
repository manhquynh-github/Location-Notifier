import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ResultListItem from './ResultListItem';
import { propTypes as LocationProps } from '../model/Location';

export default class ResultList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(LocationProps)),
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
    return (
      <ResultListItem
        saved={item.label ? true : false}
        name={item.name}
        address={item.address}
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
