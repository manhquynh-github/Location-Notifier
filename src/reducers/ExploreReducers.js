import { CHANGE_LOCATION } from '../constants/ActionTypes';

const initialState = {
  location: null,
};

const exploreReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case CHANGE_LOCATION: {
      const value = action.payload.value;
      newState.location = value;
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default exploreReducer;
