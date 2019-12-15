import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import itemReducers from './reducers/itemReducers';
import categoryReducers from './reducers/categoryReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  items: itemReducers,
  categories: categoryReducers
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;