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
  Fab,
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Layout from '../constants/Layout';
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';

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
        <Button
          full
          onPress={this.onSearchPressed}
          style={styles.addressBar}>
          <Text
            uppercase={false}
            style={{ color: '#000' }}>
            Search
          </Text>
        </Button>
        <Fab
          active={false}
          containerStyle={{}}
          style={styles.rangeButton}
          position="bottomRight">
          <Icon
            name='street-view'
            type='FontAwesome'
            style={{ color: 'gray' }} />
        </Fab>
        <Fab
          containerStyle={{}}
          style={styles.myLocationButton}
          position="bottomRight">
          <Icon
            name='my-location'
            type='MaterialIcons'
            style={{ color: 'gray' }} />
        </Fab>
        <Fab
          containerStyle={{}}
          style={styles.startButton}
          position="bottomRight">
          <Icon
            name='play' />
        </Fab>
        <Content>
          <Image source={googleMapLogo} style={{}} />
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
  addressBar: {
    zIndex: 1,
    position: 'absolute',
    top: 10 + Layout.statusBarHeight,
    left: 10,
    right: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  startButton: {
    backgroundColor: Colors.tintColor,
  },
  myLocationButton: {
    backgroundColor: 'white',
    bottom: 75,
  },
  rangeButton: {
    backgroundColor: 'white',
    bottom: 150,
  }
});

export default withNavigation(MainExploreScreen);