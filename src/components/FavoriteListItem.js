import React, { Component } from 'react';
import { ListItem, Left, Body, Right, CheckBox, Text, Icon, Button } from 'native-base';
import PropTypes from 'prop-types';

export default class FavoriteListItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    locationName: PropTypes.string.isRequired,
    onRemovePressed: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <ListItem>
        <Body>
          <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
          <Text>{this.props.locationName}</Text>
        </Body>
        <Right>
          <Button
            transparent
            onPress={this.props.onRemovePressed}
          >
            <Icon name='trash' style={{ color: 'gray' }} />
          </Button>
        </Right>
      </ListItem>
    );
  }
}