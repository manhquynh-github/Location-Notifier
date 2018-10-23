import { combineReducers } from 'redux';
import favoriteReducer from './FavoriteReducers';
import settingsReducer from './SettingsReducers';

const combinedReducer = combineReducers({
  favoriteReducer,
  settingsReducer,
});

export default combinedReducer;