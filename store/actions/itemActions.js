import { ITEM_REQUEST_INITIATED, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_ERROR } from '../actionTypes';
import { findAll } from '../asyncActions/index';

export const fetchItems = (category_id) => {
  let query = `category_id=${category_id}`
  return function(dispatch) {
    dispatch(onStart())
    return findAll('item', query)
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(e))
  }
}

export const fetchAllItems = () => {
  return function(dispatch) {
    dispatch(onStart())
    return findAll('item')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(e))
  }
}

export const onStart = () => {
  return {
    type: ITEM_REQUEST_INITIATED
  }
}

export const onSuccess = (payload) => {
  return {
    type: FETCH_ITEMS_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: FETCH_ITEMS_ERROR,
    payload: error
  }
}