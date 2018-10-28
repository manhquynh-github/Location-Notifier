//For ringtones


export class PlaylistItem {
  constructor(name, asset) {
    this.name = name;
    this.asset = asset;
  }
}

export const PLAYLIST = [
  {"item":new PlaylistItem("Alarm 1", require("../assets/audio/Alarm1.mp3"))},
  {"item":new PlaylistItem("Alarm 2", require("../assets/audio/Alarm2.mp3"))},
  {"item":new PlaylistItem("Alarm 3", require("../assets/audio/Alarm3.mp3"))},
  {"item":new PlaylistItem("Alarm 4", require("../assets/audio/Alarm4.mp3"))},
  {"item":new PlaylistItem("Alarm 5", require("../assets/audio/Alarm5.mp3"))},
];

export const LOADING_STRING = "... loading ...";
export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
