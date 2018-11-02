import { Body, Button, Icon, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FavoriteListItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    locationName: PropTypes.string,
    onPress: PropTypes.func,
    onRemovePress: PropTypes.func,
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
            {this.props.title}
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {this.props.locationName}
          </Text>
        </Body>
        <Button
          transparent
          onPress={this.onRemovePress}
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
