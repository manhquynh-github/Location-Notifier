import { createStore } from 'redux';
import combinedReducer from '../reducers/combinedReducer';
import {persistReducer,persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native'

const persistConfig ={
    key:'root',
    storage:AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig,combinedReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
