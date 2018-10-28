import React, { Component } from "react";
import { Platform, StyleSheet, FlatList } from "react-native";
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
import { Asset, Audio } from "expo";

class PlaylistItem {
  constructor(name, asset) {
    this.name = name;
    this.asset = asset;
  }
}

const PLAYLIST = [
  new PlaylistItem("Alarm 1", require("../assets/audio/Alarm1.mp3")),
  new PlaylistItem("Alarm 2", require("../assets/audio/Alarm2.mp3")),
  new PlaylistItem("Alarm 3", require("../assets/audio/Alarm3.mp3")),
  new PlaylistItem("Alarm 4", require("../assets/audio/Alarm4.mp3")),
  new PlaylistItem("Alarm 5", require("../assets/audio/Alarm5.mp3"))
];

const LOADING_STRING = "... loading ...";
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;

export default class RingtoneSetting extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
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
      throughEarpiece: false
    };

    this._onBackPress = this._onBackPress.bind(this);
    this._onPlayPausePressed = this._onPlayPausePressed.bind(this);
  };

  //Set mode for audio
  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
  };

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.headerSetting}>
          <Left>
            <Button transparent onPress={this._onBackPress}>
              <Icon name="arrow-back" />
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
                <Text onPress={this._onPlayPausePressed}>Simon Mignolet</Text>
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
  };

  _onBackPress() {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
    this.props.navigation.navigate("MainSetting");
  };

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = PLAYLIST[this.index].asset;
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;

    this.playbackInstance.setIsLoopingAsync(this.state.loopingType);

    this.playbackInstance.playAsync();

    this._updateScreenForLoading(false);
  }
  _onPlaybackStatusUpdate = status => {
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
        this._loadNewPlaybackInstance(status.shouldPlay); //LOOP
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        isLoading: true
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        isLoading: false
      });
    }
  };

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        //this.playbackInstance.pauseAsync();
        this.playbackInstance.stopAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    } else {
      this._loadNewPlaybackInstance(true);
    }
  };
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
  selectedItem: {
    backgroundColor: "#cde1f9"
  }
});
