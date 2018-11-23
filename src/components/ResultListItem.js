import { Body, Button, Icon, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default class ResultListItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    onPress: PropTypes.func,
    onSavePress: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    address: '',
    onPress: undefined,
    onSavePress: undefined,
  };

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.onSavePress = this.onSavePress.bind(this);
  }

  render() {
    return (
      <ListItem noIndent button onPress={this.onPress} delayPressIn={0}>
        <Body>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ fontWeight: 'bold' }}>
            {this.props.label}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {this.props.address}
          </Text>
        </Body>
        <Button
          transparent
          onPress={this.onSavePress}
          delayPressIn={0}
          rounded
          androidRippleColor="lightgray">
          <Icon
            name="favorite"
            type="MaterialIcons"
            style={{ color: this.props.label ? Colors.primary : 'gray' }}
          />
        </Button>
      </ListItem>
    );
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  onSavePress() {
    if (this.props.onSavePress) {
      this.props.onSavePress();
    }
  }
}
