import { FETCH_CARTITEM_ERROR, FETCH_CARTITEM_REQUEST, FETCH_CARTITEM_SUCCESS, MERGE_CARTITEMS } from '../actionTypes';

import { query, createRecord, updateRecord, deleteRecord } from '../asyncActions/index';

export const fetchCartItems = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('cart-item', 'cart_id=1')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const creatCartItem = (item_id, totalPrice) => {
  return function(dispatch) {
    dispatch(onStart())
    let cartItem = {
      "cart_id": 1,
      "item_id": item_id,
      "quantity": 1,
      "total_price": totalPrice,
    }
    return createRecord('cart-item', cartItem)
    .then((response) => console.log(response))
    .catch(error => dispatch(onError(error)))
  }
}

export const updateItem = (cart_item_id, quantity, totalPrice) => {
  return function(dispatch) {
    dispatch(onStart())
    let cartItem = {
      "quantity": quantity,
      "total_price": totalPrice,
    }
    return updateRecord('cart-item', cart_item_id, cartItem)
    .then((response) => console.log('update response', response))
    .catch(error => dispatch(onError(error)))
  }
}

export const deleteItem = (cart_item_id) => {
  return function(dispatch) {
    dispatch(onStart())
    return deleteRecord('cart-item', cart_item_id)
    .then((response) => console.log('delete response', response))
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

export const mergeItems = (payload) => {
  return {
    type: MERGE_CARTITEMS,
    payload: payload
  }
}