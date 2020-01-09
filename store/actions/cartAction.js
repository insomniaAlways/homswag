import { FETCH_CART_ERROR, FETCH_CART_REQUEST, FETCH_CART_SUCCESS } from '../actionTypes';

import { query, findRecord } from '../asyncActions/index';

export const fetchCart = () => {
  return function(dispatch) {
    dispatch(onStart())
    return findRecord('cart')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const onStart = () => {
  return {
    type: FETCH_CART_REQUEST
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_CART_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_CART_ERROR,
    payload: error
  }
}