import { CHANGE_RANGE } from '../constants/ActionTypes';

export const setRangeOption = optionID => ({
  type: CHANGE_RANGE,
  payload: { optionID: optionID },
});