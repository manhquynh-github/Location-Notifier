import { CHANGE_LOCATION, STOP_DIRECT } from '../constants/ActionTypes';

export const changeLocation = (value) => ({
  type: CHANGE_LOCATION,
  payload: { value: value },
});
export const stopDirect = () => ({
  type: STOP_DIRECT,
  payload: {  },
});
