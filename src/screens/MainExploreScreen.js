import {
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Left,
  Title,
  Icon,
  Input,
  Card,
  CardItem,
  Item,
  Grid,
  Col,
  Row,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Layout from '../constants/Layout';

const googleMapLogo = require('../assets/images/GoogleMapLogo.png');

export default class MainExploreScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{ flex: 0 }}>
              <Col>
                <Item style={{ paddingLeft: 10 }}>
                  <Icon name="search" />
                  <Input placeholder="Search" />
                </Item>
              </Col>
              <Col style={{ flex: 0 }}>
                <Button transparent>
                  <Icon name='street-view' type='FontAwesome' />
                </Button>
              </Col>
              <Col style={{ flex: 0 }}>
                <Button transparent>
                  <Icon name='my-location' type='MaterialIcons' />
                </Button>
              </Col>
            </Row>
            <Row>
              <Image source={googleMapLogo} style={{ height: Layout.window.width, width: null, flex: 1 }} />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonCol: {
    width: 40,
  }
});