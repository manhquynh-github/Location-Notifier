import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';

export default class DetailExploreScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <StatusBarOverlay />
          <Text>Detail Explore</Text>
        </Content>
      </Container>
    );
  }
}