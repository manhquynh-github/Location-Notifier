import { Body, Button, Icon, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class FavoriteListItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onMorePress: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    address: '',
    onPress: undefined,
    onLongPress: undefined,
    onMorePress: undefined,
  };

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.onMorePress = this.onMorePress.bind(this);
  }

  render() {
    return (
      <ListItem
        noIndent
        button
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        delayPressIn={0}
        delayLongPress={0}>
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
          icon
          transparent
          onPress={this.onMorePress}
          delayPressIn={0}
          rounded
          androidRippleColor="lightgray">
          <Icon name="more" style={styles.moreIcon} />
        </Button>
      </ListItem>
    );
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress();
    }
  }

  onMorePress() {
    if (this.props.onMorePress) {
      this.props.onMorePress();
    }
  }
}

const styles = StyleSheet.create({
  moreIcon: {
    color: 'gray',
  },
});
