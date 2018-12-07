import { Body, Button, Icon, ListItem, Text } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Colors from '../constants/Colors';

export default class ResultListItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    saved: PropTypes.bool,
    onPress: PropTypes.func,
    onChangeSave: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    address: '',
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onChangeSave = this.onChangeSave.bind(this);
    this.state = { saved: props.saved };
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
        {this.props.saved === undefined ? null : (
          <Button
            icon
            transparent
            onPress={this.onChangeSave}
            delayPressIn={0}
            rounded
            androidRippleColor="lightgray">
            <Icon
              name="favorite"
              type="MaterialIcons"
              style={{ color: this.state.saved ? Colors.primary : 'gray' }}
            />
          </Button>
        )}
      </ListItem>
    );
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.saved != nextProps.saved) {
      nextState.saved = nextProps.saved;
    }
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  onChangeSave() {
    if (this.props.onChangeSave) {
      this.props.onChangeSave();
    }

    this.setState({
      saved: !this.state.saved,
    });
  }
}
