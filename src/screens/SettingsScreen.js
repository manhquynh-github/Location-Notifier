import React, { Component } from 'react';
import { Platform, StyleSheet } from "react-native";
import {
  Container,
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
  Separator,
  View,
  ActionSheet
} from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';
import { RANGE_OPTIONS } from '../constants/RangeOptions'

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVibrate: true,
      rangeIndex: 0,
    };
    this._onPressRange = this._onPressRange.bind(this);
    this._onPressRingtone = this._onPressRingtone.bind(this);
    this._onValueChange = this._onValueChange.bind(this);
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay></StatusBarOverlay>
        <Header style={styles.headerSetting} noLeft
        >
          <Left />
          <Body>
            <Title style={styles.title}>Setting</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Separator />
          <View>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FD3C2D" }}>
                  <Icon
                    active
                    name="vibrate"
                    type="MaterialCommunityIcons" />
                </Button>
              </Left>
              <Body>
                <Text>Vibrate</Text>
              </Body>
              <Right>
                <Switch
                  value={this.state.selectVibrate}
                  onValueChange={this._onValueChange}
                  onTintColor="#50B948" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon active name="notifications" />
                </Button>
              </Left>
              <Body>
                <Text onPress={this._onPressRingtone}>Ringtone</Text>
              </Body>
              <Right>
                <Text style={styles.nameRingtone}
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  onPress={this._onPressRingtone}>Take me to your heart</Text>

                {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
              </Right>
            </ListItem>
            <ListItem icon last>
              <Left>
                <Button style={{ backgroundColor: "#43D751" }}>
                  <Icon active name="map-marker-distance"
                    type="MaterialCommunityIcons" />
                </Button>
              </Left>
              <Body>
                <Text onPress={this._onPressRange}>Range to Ring</Text>
              </Body>
              <Right>
                <Text style={styles.nameRingtone}
                  ellipsizeMode='tail'
                  onPress={this._onPressRange}
                >
                  {RANGE_OPTIONS[this.state.rangeIndex]} m</Text>

                {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
              </Right>
            </ListItem>
          </View>

          <Separator />
          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: "#127cd4" }}>
                <Icon
                  active name="information-outline"
                  type="MaterialCommunityIcons" />
              </Button>
            </Left>
            <Body>
              <Text>About</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>

          <View>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>Đội ngũ phát triển</Text>
            <Text style={styles.aboutInfor}>Chung Mạnh Quỳnh</Text>
            <Text style={styles.aboutInfor}>Lê Đức Tiến</Text>
            <Text style={styles.aboutInfor}>Phan Đức Anh</Text>
            <Text style={styles.aboutInfor}>Điền sau</Text>
          </View>
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
    //start screen RingtoneSetting
    this.props.navigation.navigate('RingtoneSetting');
  }
  _onPressRange() {
    console.log(this.props);
    ActionSheet.show(
      {
        options: RANGE_OPTIONS,
        title: "Choose you Range to Ring"
      },
      rangeClicked => {
        this.setState({ clicked: RANGE_OPTIONS[rangeClicked] });
      }
    );
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