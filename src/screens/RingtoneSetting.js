import React, { Component } from 'react';
import { Platform, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Picker
} from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';

const Item = Picker.Item;

export default class RingtoneSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVibrate: true,
      rangeIndex: 0,
    };
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay></StatusBarOverlay>
        <Header style={styles.headerSetting} noLeft
        >
          <Left />
          <Body>
            <Title style={styles.title}>Choose Sound</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          
        </Content>
      </Container>
    );
  }

  _onValueChange() {
    alert("hello");
    const newState = this.state;
    newState.selectVibrate = newState.selectVibrate ? false : true;
    this.setState(newState);
  }

  _onPressRingtone() {
    alert("Ringtone click");
  }
  _onPressRange() {
    console.log(this.props);
  }
}


const styles = StyleSheet.create({
  headerSetting: {
    backgroundColor: 'white',
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1
  },
  title: {
    color: 'black',
  },
  nameRingtone: {
    width: 150,
    textAlign: "right",
  },
  aboutInfor: {
    textAlign: "left",
    marginLeft: 50
  },
});