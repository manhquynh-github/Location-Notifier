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

  _onPressRingtone(){
    alert("Ringtone click");
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
          <Separator />
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
              <Text style={styles.rangeRingtone} 
                    ellipsizeMode='tail' 
                    numberOfLines={1} 
                    onPress={this._onPressRingtone.bind(this)}>Take me to your heart</Text>

              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          <Separator />
          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: "#127cd4" }}>
                <Icon active name="information-outline" type="MaterialCommunityIcons" />
              </Button>
            </Left>
            <Body>
              <Text>About</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <Text style={{textAlign:"center", fontWeight:"bold"}}>Đội ngũ phát triển</Text>
          <Text style={styles.aboutInfor}>Chung Mạnh Quỳnh</Text>
          <Text style={styles.aboutInfor}>Lê Đức Tiến</Text>
          <Text style={styles.aboutInfor}>Phan Đức Anh</Text>
          <Text style={styles.aboutInfor}>Điền sau</Text>
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
  aboutInfor:{
    textAlign:"left",
    marginLeft:50 },
});