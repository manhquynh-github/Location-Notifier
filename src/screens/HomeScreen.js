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

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>Home Page</Text>
        </Content>
        <Footer>
          <FooterTab tabActiveBgColor='green' style={styles.footerTab}>
            <Button>
              <Icon name='favorite' />
              <Text>Favorite</Text>
            </Button>
            <Button>
              <Icon name='explore' />
              <Text>Explore</Text>
            </Button>
            <Button>
              <Icon name='settings' />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  footerTab: {
    backgroundColor: '#FFF',
  },
});