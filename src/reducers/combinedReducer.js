import { combineReducers } from 'redux';
import favoriteReducer from './FavoriteReducers';

const rootReducer = combineReducers({
  favoriteReducer,
});

export default rootReducer;