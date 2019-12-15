import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import itemReducers from './reducers/itemReducers';
import categoryReducers from './reducers/categoryReducers';
import authReducers from './reducers/authenticationReducer';
import cartReducers from './reducers/cartReducers';
import cartItems from './reducers/cartItemReducers';

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  items: itemReducers,
  categories: categoryReducers,
  user: authReducers,
  cart: cartReducers,
  cartItems: cartItems
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;