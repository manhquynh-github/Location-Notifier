import { Body, Button, Icon, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class FavoriteListItem extends Component {
  static propTypes = {
    /**
     * The label of this item.
     */
    label: PropTypes.string,
    /**
     * The full address of this item.
     */
    address: PropTypes.string,
    /**
     * Event listener for when this item is pressed.
     */
    onPress: PropTypes.func,
    /**
     * Event listener for when this item is pressed and held.
     */
    onLongPress: PropTypes.func,
    /**
     * Event listener for when this item's More (3 dots) button is pressed.
     */
    onMorePress: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    address: '',
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
        delayPressIn={0}>
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
  /**
   * Styles for the more (3 dots) button.
   */
  moreIcon: {
    color: 'gray',
  },
});
