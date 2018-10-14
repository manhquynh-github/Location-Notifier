import { Favorite } from '../constants/ActionTypes';

export const addFavorite = favorite => ({
  type: Favorite.ADD,
  payload: { favorite: favorite },
});

export const removeFavorite = id => ({
  type: Favorite.REMOVE,
  payload: { id: id },
});
