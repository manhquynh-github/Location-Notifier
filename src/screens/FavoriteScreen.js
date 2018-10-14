import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { getFavorites, removeFavorite } from '../backend/Favorite';

export default class FavoriteScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>Favorite</Text>
        </Content>
      </Container>
    );
  }
}