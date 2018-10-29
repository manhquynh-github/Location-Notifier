import { CHANGE_RANGE, CHANGE_RINGTONE, CHANGE_VIBRATE } from '../constants/ActionTypes';

import { RANGE_OPTIONS } from '../constants/RangeOptions';

import {PLAYLIST} from '../constants/Sound'

const initialState = {
  rangeOption: 0,
  soundID: 0,
  vibrate: true,
};

const settingsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_RANGE: {
      const id = action.payload.optionID;
      if (id < 0 || id >= RANGE_OPTIONS.length) {
        throw 'ERR: No such range option id to change.\n' + id;
      }

      newState.rangeOption = id;
      return newState;
    }
    case CHANGE_RINGTONE: {
      const soundID = action.payload.soundID;
      if (soundID < 0 || soundID >= PLAYLIST.length) {
        throw 'ERR: No such range option id to change.\n' + id;
      }

      newState.soundID = soundID;
      return newState;
    }
    case CHANGE_VIBRATE: {
      const vibrate = action.payload.vibrate;
      newState.vibrate = vibrate;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default settingsReducer;
