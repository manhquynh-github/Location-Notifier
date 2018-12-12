import {
  CHANGE_RANGE,
  CHANGE_RINGTONE,
  CHANGE_VIBRATE,
} from '../constants/ActionTypes';

import { RANGE_OPTIONS } from '../constants/RangeOptions';

import { PLAYLIST } from '../constants/Sound';

const initialState = {
  /**
   * The selected option for the range which is used in notifying process.
   */
  rangeOption: 0,
  /**
   * The selected index of the ringtone settings.
   */
  soundID: 0,
  /**
   * If vibration is allowed in notify process.
   */
  vibrate: true,
};

const settingsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_RANGE: {
      const id = action.payload.optionID;
      if (id < 0 || id >= RANGE_OPTIONS.length) {
        console.warn(
          '[ERROR]',
          '[settingsReducer]',
          'No such range optionID to change.',
          id
        );
        return newState;
      }

      newState.rangeOption = id;
      return newState;
    }
    case CHANGE_RINGTONE: {
      const soundID = action.payload.soundID;
      if (soundID < 0 || soundID >= PLAYLIST.length) {
        console.warn(
          '[ERROR]',
          '[settingsReducer]',
          'No such range soundID to change.',
          soundID
        );
        return newState;
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
