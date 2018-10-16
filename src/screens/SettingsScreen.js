import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';

export default class SettingsScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <StatusBarOverlay />
          <Text>Settings</Text>
        </Content>
      </Container>
    );
  }
}