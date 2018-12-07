import { combineReducers } from 'redux';
import exploreReducer from './ExploreReducers';
import favoriteReducer from './FavoriteReducers';
import settingsReducer from './SettingsReducers';

const combinedReducer = combineReducers({
  favoriteReducer,
  exploreReducer,
  settingsReducer,
});

export default combinedReducer;
