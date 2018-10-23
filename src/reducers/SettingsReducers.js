import {
  CHANGE_RANGE
} from '../constants/ActionTypes';

import {
  RANGE_OPTIONS,
} from '../constants/RangeOptions';

const initialState = {
  rangeOption: 0,
};

const settingsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_RANGE: {
      const id = action.payload.optionID;
      if (id < 0 || id >= RANGE_OPTIONS.length) {
        throw "ERR: No such range option id to change.\n" + id;
      }

      newState.rangeOption = id;
      return newState;
    }
    default: {
      return newState;
    }
  }
}

export default settingsReducer;