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
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    prepareSound();
    const value = this.props.index;
    this.state = {
      soundSelected: value,
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.onPlayPauseItemPress = this.onPlayPausePressItem.bind(this);
    this.renderSoundItem = this.renderSoundItem.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
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
            // extraData={this.state}
            renderItem={this.renderSoundItem}
            keyExtractor={this.keyExtractor}
            attachStateToRender={this.state} //Just make render with state, not implement
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
        style={
          data.index == this.state.soundSelected ? styles.selectedItem : {}
        }
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
    stopSound('song');

    const ringtone = this.state.soundSelected;
    this.props.setRingtone(ringtone);

    this.props.navigation.goBack();
  }

  async onPlayPausePressItem(index) {
    const newState = this.state;
    if (index != newState.soundSelected) {
      newState.soundSelected = index;
      this.setState(newState);
    }
    loadSounds({
      song: PLAYLIST[index].item.asset,
    });
    playSound('song');
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
