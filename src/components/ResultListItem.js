import { Body, Icon, ListItem, Right, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

export default class ResultListItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    locationName: PropTypes.string,
    onPress: PropTypes.func,
  };

  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
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
        <Right>
          <Icon name="arrow-up-right" type="Feather" style={styles.trashIcon} />
        </Right>
      </ListItem>
    );
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
}

const styles = StyleSheet.create({
  trashIcon: {
    color: 'gray',
  },
});
