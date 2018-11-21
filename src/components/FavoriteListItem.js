import { Body, Button, Icon, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class FavoriteListItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    onPress: PropTypes.func,
    onRemovePress: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    address: '',
    onPress: undefined,
    onRemovePress: undefined,
  };

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.onRemovePress = this.onRemovePress.bind(this);
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
          onPress={this.onRemovePress}
          delayPressIn={0}
          rounded
          androidRippleColor="lightgray">
          <Icon name="trash" style={styles.trashIcon} />
        </Button>
      </ListItem>
    );
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  onRemovePress() {
    if (this.props.onRemovePress) {
      this.props.onRemovePress();
    }
  }
}

const styles = StyleSheet.create({
  trashIcon: {
    color: 'gray',
  },
});
