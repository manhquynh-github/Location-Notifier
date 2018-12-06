import { createStore } from 'redux';
import combinedReducer from '../reducers/combinedReducer';
import { persistReducer, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/hardSet';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
