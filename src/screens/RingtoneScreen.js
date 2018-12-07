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
  Text,
  Title,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setRingtone } from '../actions/SettingsActions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import {
  loadSounds,
  PLAYLIST,
  playSound,
  prepareSound,
  stopSound,
} from '../constants/Sound';

export class RingtoneSetting extends Component {
  static propTypes = {
    soundID: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    prepareSound();
    this.state = {
      selectedIndex: props.soundID,
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.onPlayPauseItemPress = this.onPlayPausePressItem.bind(this);
    this.onRenderItem = this.onRenderItem.bind(this);
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      async (payload) => {
        await stopSound('song').catch((error) => {
          console.warn('[ERROR]', '[willBlurSubscription]', error);
        });
      }
    );
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              rounded
              delayPressIn={0}
              androidRippleColor="lightgray"
              onPress={this.onBackPress}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Choose Sound</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <FlatList
            data={PLAYLIST}
            renderItem={this.onRenderItem}
            keyExtractor={this.keyExtractor}
            extraData={this.state}
          />
        </Content>
      </Container>
    );
  }

  componentWillUnmount() {
    this.willBlurSubscription.remove();
  }

  onRenderItem({ item, index }) {
    console.log(item.name);
    return (
      <ListItem
        noIndent
        icon
        button
        delayPressIn={0}
        onPress={() => {
          this.onPlayPausePressItem({ item, index });
        }}>
        <Left style={{ width: 25 }}>
          {index == this.state.selectedIndex && (
            <Icon name="checkmark" style={{ color: Colors.primary }} />
          )}
        </Left>
        <Body>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {item.name}
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  keyExtractor(item, soundID) {
    return `sound-item-${soundID}`;
  }

  async onBackPress() {
    await stopSound('song').catch((error) => {
      console.warn('[ERROR]', '[onBackPress]', error);
    });
    this.props.navigation.goBack();
  }

  async onPlayPausePressItem({ item, index }) {
    if (index != this.state.selectedIndex) {
      this.setState({ selectedIndex: index });
      this.props.setRingtone(index);
    }
    loadSounds({
      song: item.asset,
    });
    await playSound('song').catch((error) => {
      console.warn('[ERROR]', '[onPlayPausePressItem]', error);
    });
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
  selectedItem: {
    backgroundColor: '#cde1f9',
  },
});
const mapStateToProps = (state) => ({
  soundID: state.settingsReducer.soundID,
});

const mapDispatchToProps = (dispatch) => ({
  setRingtone: (soundID) => dispatch(setRingtone(soundID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RingtoneSetting);
