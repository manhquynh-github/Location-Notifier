import { CHANGE_LOCATION, STOP_NAVIGATING,START_NAVIGATING, CHANGE_STATION_TYPE } from '../constants/ActionTypes';

export const changeLocation = (value) => ({
  type: CHANGE_LOCATION,
  payload: { value: value },
});
export const stopDirect = () => ({
  type: STOP_NAVIGATING,
  payload: {  },
});
export const startDirect = () => ({
  type: START_NAVIGATING,
  payload: {  },
});

export const changeStationType = (value) => ({
  type: CHANGE_STATION_TYPE,
  payload: { value: value },
});