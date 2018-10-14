import { Favorite } from '../constants/ActionTypes';
import { getFavorites, addFavorite, deleteFavorite } from '../backend/Favorite';

const initialState = {
  favorites: getFavorites(),
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

    case Favorite.DELETE: {
      const id = action.payload.id;
      try {
        deleteFavorite(id);
      } catch (e) {
        console.log(e);
        throw e;
      }

      // look for array index
      let arrIdx = currentState.favorites.findIndex(
        e => e.id == id
      );

      if (arrIdx < 0) {
        throw "ERR: No such id to delete.\n" + id;
      }

      currentState.favorites.splice(arrIdx, 1);
    }
    default: {
      return currentState;
    }
  }
}