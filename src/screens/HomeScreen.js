import { Body, Button, Container, Content, Header, Icon, Left, Title } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home Page</Title>
          </Body>
        </Header>
        <Content>
          <Text>Home Page</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});