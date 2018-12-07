import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  ListItem,
  Right,
  Separator,
  Switch,
  Text,
  Title,
  View,
  Grid,
  Col,
  Row,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Platform, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { setRangeOption, setVibrate } from '../actions/SettingsActions';
import showRangeOptions from '../components/RangeOptions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import { RANGE_OPTIONS } from '../constants/RangeOptions';
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
        <Header style={styles.header} noLeft>
          <Left />
          <Body>
            <Title>Setting</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Separator />
          <ListItem icon button onPress={this.onValueChange} delayPressIn={0}>
            <Left>
              <Button style={styles.vibrateButton}>
                <Icon active name="vibrate" type="MaterialCommunityIcons" />
              </Button>
            </Left>
            <Body>
              <Text>Vibrate</Text>
            </Body>
            <Right style={{ flex: 0 }}>
              <Switch
                value={this.props.vibrate}
                onValueChange={this.onValueChange}
                trackColor={{ true: Colors.lightPrimary, false: null }}
                thumbColor={Colors.primary}
                style={{ width: 75 }}
              />
            </Right>
          </ListItem>
          <ListItem icon button onPress={this.onPressRingtone} delayPressIn={0}>
            <Left>
              <Button style={styles.ringtoneButton}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Ringtone</Text>
            </Body>
            <Right style={{ flex: 0 }}>
              <Text
                style={styles.nameRingtone}
                ellipsizeMode="tail"
                numberOfLines={1}
                onPress={this.onPressRingtone}>
                {PLAYLIST[this.props.soundID].name}
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
              <Button style={styles.rangeButton}>
                <Icon
                  active
                  name="map-marker-distance"
                  type="MaterialCommunityIcons"
                />
              </Button>
            </Left>
            <Body>
              <Text>Range to notify</Text>
            </Body>
            <Right style={{ flex: 0 }}>
              <Text style={styles.nameRingtone} ellipsizeMode="tail">
                {RANGE_OPTIONS[this.props.rangeOption]}
              </Text>
              {Platform.OS === 'ios' && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          <Separator />
          <ListItem icon last>
            <Left>
              <Button style={styles.aboutButton}>
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
          <Grid style={styles.aboutGrid}>
            <Col size={1} style={styles.aboutAppIconContainer}>
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.aboutAppIconImage}
              />
            </Col>
            <Col size={3} style={styles.aboutDescriptionContainer}>
              <Text style={styles.aboutAppNameText}>Location Notifier</Text>
              <Text>
                An app that will notify you when you are about to reach your
                destination.
              </Text>
              <View style={{ height: 16 }} />
              <Text style={{ fontWeight: 'bold' }}>Developed by</Text>
              <Text>Chung Mạnh Quỳnh</Text>
              <Text>Lê Đức Tiến</Text>
              <Text>Phan Đức Anh</Text>
              <Text>Điền sau</Text>
            </Col>
          </Grid>
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
    this.props.navigation.navigate('Ringtone');
  }

  onPressRange() {
    showRangeOptions(this.props.rangeOption, (selectedIndex) => {
      if (selectedIndex !== undefined) {
        this.props.setRangeOption(selectedIndex);
      }
    });
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
  nameRingtone: {
    width: 150,
    textAlign: 'right',
  },
  vibrateButton: {
    backgroundColor: '#FD3C2D',
  },
  ringtoneButton: {
    backgroundColor: '#007AFF',
  },
  rangeButton: {
    backgroundColor: '#43D751',
  },
  aboutButton: {
    backgroundColor: '#127cd4',
  },
  aboutGrid: {
    padding: 16,
  },
  aboutAppIconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
  aboutAppIconImage: { height: 64, width: 64 },
  aboutDescriptionContainer: {
    flexDirection: 'column',
    padding: 8,
  },
  aboutAppNameText: { fontWeight: 'bold', color: Colors.primary },
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
