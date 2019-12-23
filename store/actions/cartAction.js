import { FETCH_CART_ERROR, FETCH_CART_REQUEST, FETCH_CART_SUCCESS } from '../actionTypes';

import { query } from '../asyncActions/index';

export const fetchCart = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('cart', 'user_id=1')
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