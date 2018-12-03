import { CHANGE_LOCATION, STOP_DIRECT,START_DIRECT, CHANGE_STATION_TYPE } from '../constants/ActionTypes';

export const changeLocation = (value) => ({
  type: CHANGE_LOCATION,
  payload: { value: value },
});
export const stopDirect = () => ({
  type: STOP_DIRECT,
  payload: {  },
});
export const startDirect = () => ({
  type: START_DIRECT,
  payload: {  },
});

export const changeStationType = (value) => ({
  type: CHANGE_STATION_TYPE,
  payload: { value: value },
});