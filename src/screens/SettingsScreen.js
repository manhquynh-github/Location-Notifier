import React, { Component } from 'react';
import { Platform,StyleSheet } from "react-native";
import {   Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator} from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';

const Item = Picker.Item;

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVibrate:true,
    };
  }
  onValueChange() {
    alert("hello");
    const newState = this.state;
    newState.selectVibrate = newState.selectVibrate?false:true;
    this.setState(newState);
  }


  render() {
    return (
      <Container>
        <StatusBarOverlay></StatusBarOverlay>
        <Header style={styles.headerSetting} noLeft
          >
          <Left/>
          <Body>
            <Title style={styles.title}>Setting</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Separator bordered noTopBorder />
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="vibrate" type="MaterialCommunityIcons" />                
              </Button>
            </Left>
            <Body>
              <Text>Vibrate</Text>
            </Body>
            <Right>
              <Switch value={this.state.selectVibrate} onValueChange={this.onValueChange.bind(this)} onTintColor="#50B948" />
            </Right>
          </ListItem>
          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Ringtone</Text>
            </Body>
            <Right>
              <Text style={styles.rangeRingtone} ellipsizeMode='tail' numberOfLines={1}>Take me to your heart he eh he ah he hdh jska</Text>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          <Separator bordered />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerSetting: {
    backgroundColor:'white',
    borderBottomColor:'#ABABAB', 
    borderBottomWidth:1
  },
  title:{
    color:'black',
  },
  rangeRingtone:{
    width:150,
  },
});