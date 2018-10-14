import { createStore } from 'redux';
import rootReducer from '../reducers/combinedReducer';

const store = createStore(rootReducer);
export default store;