import { FETCH_ORDER_ERROR, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS } from '../actionTypes';

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
    type: FETCH_ORDER_REQUEST
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_ORDER_ERROR,
    payload: error
  }
}