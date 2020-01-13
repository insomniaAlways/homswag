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

export const addItemToCart = (item, quantity, totalPrice, cartItemId) => {
  return function(dispatch) {
    dispatch(onStart())
    let cartItem = {
      "cart_id": 1,
      "item_id": item.id,
      "quantity": quantity,
      "total_price": totalPrice,
    }
    return createRecord('cart-item', cartItem)
    .then((response) => fetchCartItems())
    .catch(error => dispatch(onError(error)))
  }
}

export const updateItem = (selectedCartItem, quantity, totalPrice) => {
  return function(dispatch) {
    dispatch(onStart())
    let cartItem = {
      ...selectedCartItem,
      "quantity": quantity,
      "total_price": totalPrice,
    }
    return updateRecord('cart-item', selectedCartItem.id, cartItem)
    // .then((response) => dispatch(mergeItems(response.data)))
    .then((response) => fetchCartItems())
    .catch(error => dispatch(onError(error)))
    // .catch(error => dispatch(onError(error)))
  }
}

export const deleteItem = (selectedCartItem) => {
  return function(dispatch) {
    dispatch(onStart())
    return deleteRecord('cart-item', selectedCartItem.id)
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

export const mergeItems = (payload) => {
  return {
    type: MERGE_CARTITEMS,
    payload: payload
  }
}