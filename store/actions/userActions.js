import { USER_REQUEST_INITIATED, USER_REQUEST_SUCCESS, USER_REQUEST_FAILED } from '../actionTypes';
import { findRecord } from '../asyncActions';

export const fetchUser = () => {
  return function(dispatch) {
    dispatch(onStart())
    return findRecord('me')
    .then(res => dispatch(onSuccess(res.data)))
    .catch(e => dispatch(onError(e)))
  }
}

export const updateUser = () => {
  return function(dispatch) {
    return updateRecord('me')
    .then(res => dispatch(onSuccess(res)))
    .catch(e => dispatch(onError(e)))
  }
}

export const onStart = () => {
  return {
    type: 'USER_REQUEST_INITIATED',
  }
}

export const onSuccess = (payload) => {
  return {
    type: 'USER_REQUEST_SUCCESS',
    payload: payload
  }
}

export const onError = (payload) => {
  return {
    type: 'USER_REQUEST_FAILED',
    error: payload
  }
}