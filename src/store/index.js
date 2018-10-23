import { createStore } from 'redux';
import combinedReducer from '../reducers/combinedReducer';

const store = createStore(combinedReducer);
export default store;