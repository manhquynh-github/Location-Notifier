import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  EDIT_FAVORITE,
} from '../constants/ActionTypes';

export const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  payload: { favorite: favorite },
});

export const removeFavorite = (favoriteID) => ({
  type: REMOVE_FAVORITE,
  payload: { favoriteID: favoriteID },
});

export const editFavorite = (favorite) => ({
  type: EDIT_FAVORITE,
  payload: { favorite: favorite },
});
