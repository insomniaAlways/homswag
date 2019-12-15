import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR } from '../actionTypes';
import { findAll } from '../asyncActions/index';

export const fetchCategories = () => {
  return function(dispatch) {
    dispatch(onStart())
    return findAll('category')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const onStart = () => {
  return {
    type: FETCH_CATEGORY_REQUEST
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_CATEGORY_ERROR,
    payload: error
  }
}