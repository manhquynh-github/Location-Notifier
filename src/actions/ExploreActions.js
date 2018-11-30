import { CHANGE_LOCATION, STOP_DIRECT,START_DIRECT, CHANGE_TYPE_STATION } from '../constants/ActionTypes';

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

export const changeTypeStation = (value) => ({
  type: CHANGE_TYPE_STATION,
  payload: { value: value },
});