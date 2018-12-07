import {
  CHANGE_LOCATION,
  CHANGE_STATION_TYPE,
  START_NAVIGATING,
  STOP_NAVIGATING,
} from '../constants/ActionTypes';

import { NONE } from '../constants/StationTypes';

const initialState = {
  location: null,
  isNavigating: false,
  stationType: NONE,
};

const exploreReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_LOCATION: {
      const value = action.payload.value;
      newState.location = value;
      return newState;
    }
    case STOP_NAVIGATING: {
      newState.isNavigating = false;
      return newState;
    }
    case START_NAVIGATING: {
      newState.isNavigating = true;
      return newState;
    }
    case CHANGE_STATION_TYPE: {
      const value = action.payload.value;
      newState.stationType = value;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default exploreReducer;
