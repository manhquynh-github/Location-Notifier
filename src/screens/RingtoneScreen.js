import React, { Component } from 'react';
import { Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
  Icon,
} from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';
import { Asset, Audio } from 'expo';
import {
  PLAYLIST,
  PlaylistItem,
  LOADING_STRING,
  LOOPING_TYPE_ALL,
  LOOPING_TYPE_ONE,
} from '../constants/Sound';
import { setRingtone } from '../actions/SettingsActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';

export class RingtoneSetting extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.playbackInstance = null;

    this.state = {
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ONE,
      muted: false,
      shouldPlay: true,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      poster: false,
      useNativeControls: false,
      throughEarpiece: false,
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.onPlayPauseItemPress = this.onPlayPausePressItem.bind(this);
    this.renderSoundItem = this.renderSoundItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
  }

  //Set mode for audio
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
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
            extraData={this.state}
            renderItem={this.renderSoundItem}
            keyExtractor={this.keyExtractor}
          />
        </Content>
      </Container>
    );
  }

  renderSoundItem(data) {
    return (
      <ListItem
        noIndent
        iconRight
        button
        delayPressIn={0}
        style={data.index == this.props.index ? styles.selectedItem : {}}
        onPress={() => {
          this.onPlayPausePressItem(data.index);
        }}>
        <Body>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            {data.item.item.name}
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
  //keyExtractor = (item, index) =>{PLAYLIST[index].item.name}  //WARNING
  keyExtractor(item, index) {
    return PLAYLIST[index].item.name;
  }

  onBackPress() {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
    this.props.navigation.goBack();
  }

  async loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = PLAYLIST[this.props.index].item.asset;
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType,
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this.onPlaybackStatusUpdate //get status and looping sound
    );
    this.playbackInstance = sound;

    this.playbackInstance.playAsync();

    //this._updateScreenForLoading(false); //TODO: Update icon
  }

  onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.setState({
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: LOOPING_TYPE_ONE,
        shouldCorrectPitch: status.shouldCorrectPitch,
      });
      if (status.didJustFinish && !status.isLooping) {
        this.loadNewPlaybackInstance(status.shouldPlay); //LOOP
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        isLoading: true,
      });
    } else {
      const newState = this.state;
      newState.playbackInstanceName = PLAYLIST[this.props.index].item.name;
      newState.isLoading = false;
      this.setState(newState);
    }
  }

  onPlayPausePressItem = (index) => {
    if (index != this.props.index) {
      this.props.setRingtone(index);

      this.loadNewPlaybackInstance(true);
    } else {
      if (this.playbackInstance != null) {
        if (this.state.isPlaying) {
          //this.playbackInstance.pauseAsync();
          this.playbackInstance.stopAsync();
        } else {
          this.playbackInstance.playAsync();
        }
      } else {
        this.loadNewPlaybackInstance(true);
      }
    }
  };
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
  nameRingtone: {
    width: 150,
    textAlign: 'right',
  },
  selectedItem: {
    backgroundColor: '#cde1f9',
  },
});
const mapStateToProps = (state) => ({
  index: state.settingsReducer.soundID,
});

const mapDispatchToProps = (dispatch) => ({
  setRingtone: (index) => dispatch(setRingtone(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RingtoneSetting);
