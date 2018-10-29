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
  {"item":new PlaylistItem("Alarm 6", require("../assets/audio/Alarm6.mp3"))},
  {"item":new PlaylistItem("Alarm 7", require("../assets/audio/Alarm7.mp3"))},
  {"item":new PlaylistItem("Alarm 8", require("../assets/audio/Alarm8.mp3"))},
  {"item":new PlaylistItem("Alarm 9", require("../assets/audio/Alarm9.mp3"))},
  {"item":new PlaylistItem("Alarm 10", require("../assets/audio/Alarm10.mp3"))},
  {"item":new PlaylistItem("Alarm 11", require("../assets/audio/Alarm11.mp3"))},
  {"item":new PlaylistItem("Alarm 12", require("../assets/audio/Alarm12.mp3"))},
  {"item":new PlaylistItem("Alarm 13", require("../assets/audio/Alarm13.mp3"))},
  {"item":new PlaylistItem("Alarm 14", require("../assets/audio/Alarm14.mp3"))},
  {"item":new PlaylistItem("Alarm 15", require("../assets/audio/Alarm15.mp3"))},
  {"item":new PlaylistItem("Alarm 16", require("../assets/audio/Alarm16.mp3"))},
  {"item":new PlaylistItem("Alarm 17", require("../assets/audio/Alarm17.mp3"))},
  {"item":new PlaylistItem("Alarm 18", require("../assets/audio/Alarm18.mp3"))},
  {"item":new PlaylistItem("Alarm 19", require("../assets/audio/Alarm19.mp3"))},
  {"item":new PlaylistItem("Alarm 20", require("../assets/audio/Alarm20.mp3"))},
  {"item":new PlaylistItem("Alarm 21", require("../assets/audio/Alarm21.mp3"))},
];

export const LOADING_STRING = "... loading ...";
export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
