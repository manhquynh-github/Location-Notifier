import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants/ActionTypes';
import { getFavorites, addFavorite, removeFavorite } from '../backend/Favorite';

const initialState = {
  favorites: [...getFavorites()],
};

const favoriteReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_FAVORITE: {
      const item = action.payload.favorite;
      try {
        addFavorite(item);
      } catch (e) {
        console.log(e);
        throw e;
      }

      newState.favorites.concat(item);
      return newState;
    }

    case REMOVE_FAVORITE: {
      const id = action.payload.id;
      try {
        removeFavorite(id);
      } catch (e) {
        console.log(e);
        throw e;
      }

      // reassign new array
      newState.favorites = [...state.favorites];

      // look for array index
      let arrIdx = newState.favorites.findIndex((e) => e.id == id);

      if (arrIdx < 0) {
        throw 'ERR: No such id to remove.\n' + id;
      }

      newState.favorites.splice(arrIdx, 1);
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default favoriteReducer;
