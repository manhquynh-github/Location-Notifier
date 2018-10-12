import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Left,
  Title
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class MainExploreScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>Home Page</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footerTab: {
    backgroundColor: '#FFF',
  },
});