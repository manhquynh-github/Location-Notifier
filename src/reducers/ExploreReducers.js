import { CHANGE_LOCATION, STOP_DIRECT } from '../constants/ActionTypes';

const initialState = {
  location: null,
  isDirect:false,
};

const exploreReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_LOCATION: {
      const value = action.payload.value;
      newState.location = value;
      newState.isDirect=true;
      return newState;
    }
    case STOP_DIRECT: {
      newState.isDirect=false;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default exploreReducer;
