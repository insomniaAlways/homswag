import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import itemReducers from './reducers/itemReducers';
import categoryReducers from './reducers/categoryReducers';
import authReducers from './reducers/authenticationReducer';
import cartReducers from './reducers/cartReducers';
import cartItems from './reducers/cartItemReducers';
import { initialState } from './intialValues';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  items: itemReducers,
  categories: categoryReducers,
  user: authReducers,
  cart: cartReducers,
  cartItems: cartItems
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

export default store;