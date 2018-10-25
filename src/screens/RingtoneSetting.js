import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Picker,
  List,
  ListItem,
  Text,
  Button,
  Icon
} from "native-base";
import StatusBarOverlay from "../components/StatusBarOverlay";

const Item = Picker.Item;

export default class RingtoneSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ringtoneIndex: 0
    };
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.headerSetting}>
          <Left>
            <Button
              transparent
              onPress={this._onBackPress.bind(this)}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Choose Sound</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List>
            <ListItem noIndent style={styles.selectedItem}>
              <Left>
                <Text>Simon Mignolet</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Nathaniel Clyne</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dejan Lovren</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }

  _onValueChange() {
    alert("hello");
    // const newState = this.state;
    // newState.selectVibrate = newState.selectVibrate ? false : true;
    // this.setState(newState);
  }

  _onPressRingtone() {
    alert("Ringtone click");
  }
  _onBackPress(){
    this.props.navigation.navigate("MainSetting");  
  }
}

const styles = StyleSheet.create({
  headerSetting: {
    backgroundColor: "#127cd4",
    borderBottomColor: "#ABABAB",
    borderBottomWidth: 1
  },
  title: {
    color: "white"
  },
  nameRingtone: {
    width: 150,
    textAlign: "right"
  },
  aboutInfor: {
    textAlign: "left",
    marginLeft: 50
  },
  selectedItem:
  {
     backgroundColor: "#cde1f9" 
  },
});
