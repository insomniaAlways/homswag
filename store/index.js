import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import itemReducers from './reducers/itemReducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  items: itemReducers
})

let composeEnhancers = compose;

if(__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;