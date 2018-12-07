//For ringtones
import { Audio } from 'expo';

export class PlaylistItem {
  constructor(name, asset) {
    this.name = name;
    this.asset = asset;
  }
}

export const PLAYLIST = [
  new PlaylistItem(
    'Alarm 0',
    require('../../android/app/src/main/res/raw/alarm0.mp3')
  ),

  new PlaylistItem(
    'Alarm 1',
    require('../../android/app/src/main/res/raw/alarm1.mp3')
  ),

  new PlaylistItem(
    'Alarm 2',
    require('../../android/app/src/main/res/raw/alarm2.mp3')
  ),

  new PlaylistItem(
    'Alarm 3',
    require('../../android/app/src/main/res/raw/alarm3.mp3')
  ),

  new PlaylistItem(
    'Alarm 4',
    require('../../android/app/src/main/res/raw/alarm4.mp3')
  ),

  new PlaylistItem(
    'Alarm 5',
    require('../../android/app/src/main/res/raw/alarm5.mp3')
  ),

  new PlaylistItem(
    'Alarm 6',
    require('../../android/app/src/main/res/raw/alarm6.mp3')
  ),

  new PlaylistItem(
    'Alarm 7',
    require('../../android/app/src/main/res/raw/alarm7.mp3')
  ),

  new PlaylistItem(
    'Alarm 8',
    require('../../android/app/src/main/res/raw/alarm8.mp3')
  ),

  new PlaylistItem(
    'Alarm 9',
    require('../../android/app/src/main/res/raw/alarm9.mp3')
  ),

  new PlaylistItem(
    'Alarm 10',
    require('../../android/app/src/main/res/raw/alarm10.mp3')
  ),

  new PlaylistItem(
    'Alarm 11',
    require('../../android/app/src/main/res/raw/alarm11.mp3')
  ),

  new PlaylistItem(
    'Alarm 12',
    require('../../android/app/src/main/res/raw/alarm12.mp3')
  ),

  new PlaylistItem(
    'Alarm 13',
    require('../../android/app/src/main/res/raw/alarm13.mp3')
  ),
];

const SOUNDS = {};

let SOURCES = {};

export async function prepareSound() {
  await Audio.setIsEnabledAsync(true);
  //console.log('Set Expo.Audio enabled');
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });
  //console.log('Set Expo.Audio mode');
}

export function loadSounds(sources) {
  SOURCES = { ...SOURCES, ...sources };
}

export async function playSound(key) {
  if (SOUNDS[key]) {
    //console.log("That sound has already been played, let's reload.");
    await SOUNDS[key].unloadAsync();
    //console.log('Sound unloaded successfully!');
  } else {
    //console.log('New sound to play!');
    SOUNDS[key] = new Audio.Sound();
  }

  await SOUNDS[key].loadAsync(SOURCES[key]);
  //console.log('Sound loaded successfully!');
  SOUNDS[key].playAsync();
  //console.log('Playing...');
}

export async function stopSound(key) {
  const status = await SOUNDS[key].getStatusAsync();
  if (!status.isLoaded) {
    console.warn('[stopMusic] not loaded');
    return false;
  }

  //console.log('Stopping...');
  await SOUNDS[key].stopAsync();
  return true;
}
