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
  Text,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Layout from '../constants/Layout';
import { withNavigation } from 'react-navigation';

const googleMapLogo = require('../assets/images/GoogleMapLogo.png');

class MainExploreScreen extends Component {
  constructor() {
    super();
    this.onSearchPressed = this.onSearchPressed.bind(this);
    this.onLocatePressed = this.onLocatePressed.bind(this);
    this.onRangePressed = this.onRangePressed.bind(this);
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={styles.shrink}>
              <Col>
                <Button
                  full
                  transparent
                  onPress={this.onSearchPressed}>
                  <Text
                    uppercase={false}
                    style={{ color: '#000' }}>
                    Search
                    </Text>
                </Button>
              </Col>
              <Col style={styles.shrink}>
                <Button
                  transparent
                  onPress={this.onLocatePressed}>
                  <Icon
                    name='my-location'
                    type='MaterialIcons'
                    style={styles.actionButtonColor} />
                </Button>
              </Col>
              <Col style={styles.shrink}>
                <Button
                  transparent
                  onPress={this.onRangePressed}>
                  <Icon
                    name='street-view'
                    type='FontAwesome'
                    style={styles.actionButtonColor} />
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

  onSearchPressed() {
    console.log(this.props);
    this.props.navigation.navigate('DetailExplore');
  }

  onLocatePressed() {

  }

  onRangePressed() {

  }
}

const styles = StyleSheet.create({
  shrink: {
    flex: 0,
  },
  actionButtonColor: {
    color: 'gray',
  }
});

export default withNavigation(MainExploreScreen);