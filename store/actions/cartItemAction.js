import { FETCH_CARTITEM_ERROR, FETCH_CARTITEM_REQUEST, FETCH_CARTITEM_SUCCESS } from '../actionTypes';

import { query, createRecord } from '../asyncActions/index';

export const fetchCartItems = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('cart-items', 'user_id=1&cart_id=1')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const addItemToCart = (item, quantity, totalPrice) => {
  return function(dispatch) {
    dispatch(onStart())
    let cartItem = {
      "id": 1,
      "cart_id": 1,
      "item_id": item.id,
      "quantity": quantity,
      "total_price": totalPrice,
      "item": item
    }
    return createRecord('cart-items', cartItem)
    .then((response) => fetchCartItems())
    .catch(error => dispatch(onError(error)))
  }
}

export const onStart = () => {
  return {
    type: FETCH_CARTITEM_REQUEST
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_CARTITEM_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_CARTITEM_ERROR,
    payload: error
  }
}