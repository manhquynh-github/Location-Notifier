import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import combinedReducer from '../reducers/combinedReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
