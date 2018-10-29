import { CHANGE_LOCATION } from '../constants/ActionTypes';

export const changeLocation = (value) => ({
  type: CHANGE_LOCATION,
  payload: { value: value },
});
