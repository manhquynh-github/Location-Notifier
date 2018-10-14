import { Favorite } from '../constants/ActionTypes';
import { getFavorites, addFavorite, removeFavorite } from '../backend/Favorite';

const initialState = {
  favorites: [...getFavorites()],
}

const favoriteReducer = (state = initialState, action) => {
  const currentState = { ...state };
  switch (action.type) {
    case Favorite.ADD: {
      const item = action.payload.favorite;
      try {
        addFavorite(item);
      } catch (e) {
        console.log(e);
        throw e;
      }

      currentState.favorites.concat(item);
      return currentState;
    }

    case Favorite.REMOVE: {
      const id = action.payload.id;
      try {
        removeFavorite(id);
      } catch (e) {
        console.log(e);
        throw e;
      }

      // reassign new array
      currentState.favorites = [...state.favorites];

      // look for array index
      let arrIdx = currentState.favorites.findIndex(
        e => e.id == id
      );

      if (arrIdx < 0) {
        throw "ERR: No such id to remove.\n" + id;
      }

      currentState.favorites.splice(arrIdx, 1);
      return currentState;
    }
    default: {
      return currentState;
    }
  }
}

export default favoriteReducer;