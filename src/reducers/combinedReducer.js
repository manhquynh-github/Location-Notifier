import { combineReducers } from 'redux';
import favoriteReducer from './FavoriteReducers';

const combinedReducer = combineReducers({
  favoriteReducer,
});

export default combinedReducer;