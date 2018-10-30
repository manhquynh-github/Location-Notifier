import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
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
  ActionSheet,
} from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';
import { RANGE_OPTIONS } from '../constants/RangeOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setVibrate, setRangeOption } from '../actions/SettingsActions';
import { PLAYLIST } from '../constants/Sound';

export class SettingsScreen extends Component {
  static propTypes = {
    rangeOption: PropTypes.number.isRequired,
    soundID: PropTypes.number.isRequired,
    vibrate: PropTypes.bool.isRequired,
    setVibrate: PropTypes.func.isRequired,
    setRangeOption: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onPressRange = this.onPressRange.bind(this);
    this.onPressRingtone = this.onPressRingtone.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.headerSetting} noLeft>
          <Left />
          <Body>
            <Title style={styles.title}>Setting</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Separator />
          <ListItem icon button onPress={this.onValueChange} delayPressIn={0}>
            <Left>
              <Button style={{ backgroundColor: '#FD3C2D' }}>
                <Icon active name="vibrate" type="MaterialCommunityIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Vibrate</Text>
            </Body>
            <Right>
              <Switch
                value={this.props.vibrate}
                onValueChange={this.onValueChange}
                onTintColor="#50B948"
                style={{ width: 200 }}
              />
            </Right>
          </ListItem>
          <ListItem icon button onPress={this.onPressRingtone} delayPressIn={0}>
            <Left>
              <Button style={{ backgroundColor: '#007AFF' }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Ringtone</Text>
            </Body>
            <Right>
              <Text
                style={styles.nameRingtone}
                ellipsizeMode="tail"
                numberOfLines={1}
                onPress={this.onPressRingtone}>
                {PLAYLIST[this.props.soundID].item.name}
              </Text>

              {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          <ListItem
            icon
            last
            button
            onPress={this.onPressRange}
            delayPressIn={0}>
            <Left>
              <Button style={{ backgroundColor: '#43D751' }}>
                <Icon
                  active
                  name="map-marker-distance"
                  type="MaterialCommunityIcons"
                />
              </Button>
            </Left>
            <Body>
              <Text>Range to Ring</Text>
            </Body>
            <Right>
              <Text style={styles.nameRingtone} ellipsizeMode="tail">
                {`${RANGE_OPTIONS[this.props.rangeOption]} m`}
              </Text>
              {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>

          <Separator />
          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: '#127cd4' }}>
                <Icon
                  active
                  name="information-outline"
                  type="MaterialCommunityIcons"
                />
              </Button>
            </Left>
            <Body>
              <Text>About</Text>
            </Body>
            <Right />
          </ListItem>

          <View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Developers
            </Text>
            <Text style={styles.aboutInfor}>Chung Mạnh Quỳnh</Text>
            <Text style={styles.aboutInfor}>Lê Đức Tiến</Text>
            <Text style={styles.aboutInfor}>Phan Đức Anh</Text>
            <Text style={styles.aboutInfor}>Điền sau</Text>
          </View>
        </Content>
      </Container>
    );
  }

  onValueChange() {
    let check = this.props.vibrate ? false : true;
    this.props.setVibrate(check);
  }

  onPressRingtone() {
    //start screen RingtoneSetting
    this.props.navigation.navigate('RingtoneSetting');
  }
  onPressRange() {
    ActionSheet.show(
      {
        options: RANGE_OPTIONS,
        title: 'Choose you Range to Ring',
      },
      (rangeClicked) => {
        if (rangeClicked != null && rangeClicked != this.props.rangeOption)
          this.props.setRangeOption(rangeClicked);
      }
    );
  }
}

const styles = StyleSheet.create({
  headerSetting: {
    backgroundColor: 'white',
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1,
  },
  title: {
    color: 'black',
  },
  nameRingtone: {
    width: 150,
    textAlign: 'right',
  },
  aboutInfor: {
    textAlign: 'left',
    marginLeft: 50,
  },
});

const mapStateToProps = (state) => ({
  soundID: state.settingsReducer.soundID,
  rangeOption: state.settingsReducer.rangeOption,
  vibrate: state.settingsReducer.vibrate,
});

const mapDispatchToProps = (dispatch) => ({
  setVibrate: (vibrate) => dispatch(setVibrate(vibrate)),
  setRangeOption: (range) => dispatch(setRangeOption(range)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
