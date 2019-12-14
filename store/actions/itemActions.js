import { FETCH_ITEMS, FETECT_ITEMS_REQUEST, FETECT_ITEMS_SUCCESS, FETECT_ITEMS_ERROR } from '../actionTypes';
import { findAll } from '../asyncActions/index';

export const fetchItems = () => {
  dispatch(onStart())
  return findAll(dispatch, 'items')
  .then((response) => {
    console.log('actions', response)
    dispatch(onSuccess(response))
  })
  .catch((e) => dispatch(e))
}

export const onStart = () => {
  return {
    type: FETECT_ITEMS_REQUEST
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETECT_ITEMS_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETECT_ITEMS_ERROR,
    payload: error
  }
}