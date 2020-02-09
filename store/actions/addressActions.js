import { ADDRESS_REQUEST_FAILED, ADDRESS_REQUEST_INITIATED, ADDRESS_REQUEST_SUCCESS } from '../actionTypes';

import { query, createRecord, deleteRecord } from '../asyncActions/index';

export const fetchAddress = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('me/address')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e.response.data)))
  }
}

export const creatNew = (address) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('me/address', address)
    .then((response) => dispatch(onSuccess(response)))
    .catch(error => dispatch(onError(error.response.data)))
  }
}

export const deleteAddresss = (address_id) => {
  return function(dispatch) {
    dispatch(onStart())
    return deleteRecord('me/address', address_id)
    .then(() => fetchCartItems())
    .catch(error => dispatch(onError(error.response.dataor)))
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