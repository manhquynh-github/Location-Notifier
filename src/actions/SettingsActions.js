import { CHANGE_RANGE, CHANGE_RINGTONE, CHANGE_VIBRATE } from '../constants/ActionTypes';

export const setRangeOption = (optionID) => ({
  type: CHANGE_RANGE,
  payload: { optionID: optionID },
});
export const setRingtone = (soundID) => ({
  type: CHANGE_RINGTONE,
  payload: { soundID: soundID },
});
export const setVibrate = (vibrate) => ({
  type: CHANGE_VIBRATE,
  payload: { vibrate: vibrate },
});