//For ringtones


export class PlaylistItem {
  constructor(name, asset) {
    this.name = name;
    this.asset = asset;
  }
}

export const PLAYLIST = [
  {"item":new PlaylistItem("Alarm 0", require("../../android/app/src/main/res/raw/alarm0.mp3"))},
  {"item":new PlaylistItem("Alarm 1", require("../../android/app/src/main/res/raw/alarm1.mp3"))},
  {"item":new PlaylistItem("Alarm 2", require("../../android/app/src/main/res/raw/alarm2.mp3"))},
  {"item":new PlaylistItem("Alarm 3", require("../../android/app/src/main/res/raw/alarm3.mp3"))},
  {"item":new PlaylistItem("Alarm 4", require("../../android/app/src/main/res/raw/alarm4.mp3"))},
  {"item":new PlaylistItem("Alarm 5", require("../../android/app/src/main/res/raw/alarm5.mp3"))},
  {"item":new PlaylistItem("Alarm 6", require("../../android/app/src/main/res/raw/alarm6.mp3"))},
  {"item":new PlaylistItem("Alarm 7", require("../../android/app/src/main/res/raw/alarm7.mp3"))},
  {"item":new PlaylistItem("Alarm 8", require("../../android/app/src/main/res/raw/alarm8.mp3"))},
  {"item":new PlaylistItem("Alarm 9", require("../../android/app/src/main/res/raw/alarm9.mp3"))},
  {"item":new PlaylistItem("Alarm 10", require("../../android/app/src/main/res/raw/alarm10.mp3"))},
  {"item":new PlaylistItem("Alarm 11", require("../../android/app/src/main/res/raw/alarm11.mp3"))},
  {"item":new PlaylistItem("Alarm 12", require("../../android/app/src/main/res/raw/alarm12.mp3"))},
  {"item":new PlaylistItem("Alarm 13", require("../../android/app/src/main/res/raw/alarm13.mp3"))},
];

export const LOADING_STRING = "... loading ...";
export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
