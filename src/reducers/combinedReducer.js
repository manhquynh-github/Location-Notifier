import { combineReducers } from 'redux';
import favoriteReducer from './FavoriteReducers';
import exploreReducer from './ExploreReducers';
import settingsReducer from './SettingsReducers';

const combinedReducer = combineReducers({
  favoriteReducer,
  exploreReducer,
  settingsReducer,
});

export default combinedReducer;
