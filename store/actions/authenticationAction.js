import { FETCH_AUTHORISATION_REQUEST, FETCH_AUTHORISATION_SUCCESS, FETCH_AUTHORISATION_ERROR } from '../actionTypes';
import { findRecord } from '../asyncActions/index';

export const getUser = () => {
  return function(dispatch) {
    dispatch(onStart())
    return findRecord('user', 1)
    .then(response => dispatch(onSuccess(response.data)))
    .catch(error => dispatch(onError(error)))
  }
}

export const onStart = () => {
  return {
    type: FETCH_AUTHORISATION_REQUEST,
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_AUTHORISATION_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_AUTHORISATION_ERROR,
    payload: error
  }
}