import { ADDRESS_REQUEST_FAILED, ADDRESS_REQUEST_INITIATED, ADDRESS_REQUEST_SUCCESS, MERGE_CARTITEMS } from '../actionTypes';

import { query, createRecord, updateRecord, deleteRecord } from '../asyncActions/index';

export const fetchAddress = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('me/address', 'user_id=1')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const creatNew = (address) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('me/address', address)
    .then((response) => onSuccess(response))
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
    return updateRecord('me/address', selectedCartItem.id, cartItem)
    .then((response) => dispatch(mergeItems(response.data)))
    .catch(error => dispatch(onError(error)))
    // .then((response) => fetchCartItems())
    // .catch(error => dispatch(onError(error)))
  }
}

export const deleteItem = (selectedCartItem) => {
  return function(dispatch) {
    dispatch(onStart())
    return deleteRecord('me/address', selectedCartItem.id)
    .then((response) => fetchCartItems())
    .catch(error => dispatch(onError(error)))
  }
}

export const onStart = () => {
  return {
    type: ADDRESS_REQUEST_INITIATED
  }
}

export const onSuccess = (payload) => {
  return {
    type: ADDRESS_REQUEST_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: ADDRESS_REQUEST_FAILED,
    payload: error
  }
}

export const mergeItems = (payload) => {
  return {
    type: MERGE_CARTITEMS,
    payload: payload
  }
}