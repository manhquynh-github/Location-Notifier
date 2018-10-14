import { Favorite } from '../constants/ActionTypes';

export const addFavorite = favorite => ({
  type: Favorite.ADD,
  payload: { favorite: favorite },
});

export const deleteFavorite = id => ({
  type: Favorite.DELETE,
  payload: { id: id },
});
