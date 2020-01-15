import { FETCH_ADDRESS_ERROR, FETCH_ADDRESS_REQUEST, FETCH_ADDRESS_SUCCESS, MERGE_CARTITEMS } from '../actionTypes';

import { query, createRecord, updateRecord, deleteRecord } from '../asyncActions/index';

export const fetchAddress = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('address', 'user_id=1')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const addNewAddress = (address) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('address', address)
    .then((response) => fetchAddress())
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
    .then((response) => dispatch(mergeItems(response.data)))
    .catch(error => dispatch(onError(error)))
    // .then((response) => fetchCartItems())
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
    type: FETCH_ADDRESS_REQUEST
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_ADDRESS_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_ADDRESS_ERROR,
    payload: error
  }
}

export const mergeItems = (payload) => {
  return {
    type: MERGE_CARTITEMS,
    payload: payload
  }
}