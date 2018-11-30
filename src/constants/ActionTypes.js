export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const EDIT_FAVORITE = 'EDIT_FAVORITE';

export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const STOP_DIRECT = 'STOP_DIRECT';
export const START_DIRECT = 'START_DIRECT';
export const CHANGE_TYPE_STATION = 'CHANGE_TYPE_STATION';
export const NONE_STATION = 0;
export const ATM_STATION = 1;
export const GAS_STATION = 2;

export const CHANGE_RANGE = 'CHANGE_RANGE';
export const CHANGE_RINGTONE = 'CHANGE_RINGTONE';
export const CHANGE_VIBRATE = 'CHANGE_VIBRATE';

export const ActionTypes = {
  Favorites: {
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    EDIT_FAVORITE,
  },
  Explore: {
    CHANGE_LOCATION,
    STOP_DIRECT,
    START_DIRECT,
    CHANGE_TYPE_STATION,
  },
  Settings: {
    CHANGE_RANGE,
    CHANGE_RINGTONE,
    CHANGE_VIBRATE,
  },
};
