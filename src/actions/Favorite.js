import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '../constants/ActionTypes';

export const addFavorite = favorite => ({
  type: ADD_FAVORITE,
  payload: { favorite: favorite },
});

export const removeFavorite = id => ({
  type: REMOVE_FAVORITE,
  payload: { id: id },
});
