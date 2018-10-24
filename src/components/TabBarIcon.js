import { Icon } from 'native-base';
import React from 'react';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        size={26}
        style={{
          marginBottom: -3,
          color: this.props.focused
            ? Colors.tabIconSelected
            : Colors.tabIconDefault,
        }}
        {...this.props}
      />
    );
  }
}
