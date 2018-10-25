import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text ,Card, CardItem} from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';

export default class SettingsScreen extends Component {
  render() {
    return (
      <Container>
        <StatusBarOverlay></StatusBarOverlay>
        <Header>
          <Left/>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
          <Button transparent rounded>
              <Text>Footer</Text>
          </Button>
          <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}
