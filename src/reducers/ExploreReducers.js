import {
  CHANGE_LOCATION,
  STOP_NAVIGATING,
  START_NAVIGATING,
  ATM_STATION,
  GAS_STATION,
  NONE_STATION,
  CHANGE_STATION_TYPE,
} from '../constants/ActionTypes';

const initialState = {
  location: null,
  isNavigating: false,
  stationType: NONE_STATION, //NO STATION
};

const exploreReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_LOCATION: {
      const value = action.payload.value;
      newState.location = value;
      newState.isNavigating = true;
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
