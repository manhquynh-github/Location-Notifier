import { CHANGE_LOCATION, STOP_DIRECT } from '../constants/ActionTypes';

const initialState = {
  location: null,
};

const exploreReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_LOCATION: {
      const value = action.payload.value;
      newState.location = value;
      newState.location.isDirect=true;
      return newState;
    }
    case STOP_DIRECT: {
      newState.location.isDirect=false;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default exploreReducer;
