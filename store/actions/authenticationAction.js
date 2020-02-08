import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT, ON_ERROR } from '../actionTypes';
import { createRecord, initializeAxiosHeader } from '../asyncActions/index';

export const register = (phone) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('login', {phone: phone})
    .then(res => dispatch(onSuccess(res.data)))
    .catch(e => dispatch(onError(e)))
  }
}

export const validateToken = (phone, otp) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('me/validate', {phone: phone, otp: otp})
    .then((res) => {
      if(res && res.data && res.data.token) {
        dispatch(addHeader(res.data.token))
        return dispatch(onSuccess(res.data))
      }
    })
    .catch(e => dispatch(onError(e)))
  }
}

export const addHeader = (token) => {
  return function() {
    return initializeAxiosHeader(token)
  }
}

export const onStart = () => {
  return {
    type: RESTORE_TOKEN,
  }
}

export const onSuccess = (payload) => {
  return {
    type: SIGN_IN,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: ON_ERROR,
    error: error
  }
}

export const onSigout = () => {
  return {
    type: SIGN_OUT
  }
}