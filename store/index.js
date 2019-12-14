import { createStore, combineReducers, applyMiddleware } from 'redux';
import itemReducers from './reducers/itemReducers';

const rootReducer = combineReducers({
  items: itemReducers
})

const store = createStore(rootReducer)

export default store;