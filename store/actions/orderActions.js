import { ORDER_REQUEST_FAILED, ORDER_REQUEST_INITIATED, ORDER_REQUEST_SUCCESS } from '../actionTypes';

import { query, findRecord } from '../asyncActions/index';

export const fetchOrder = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('order')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const onStart = () => {
  return {
    type: ORDER_REQUEST_INITIATED
  }
}

export const onSuccess = (payload) => {
  return {
    type: ORDER_REQUEST_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: ORDER_REQUEST_FAILED,
    payload: error
  }
}