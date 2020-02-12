import { ORDER_REQUEST_FAILED, ORDER_REQUEST_INITIATED, ORDER_REQUEST_SUCCESS, ORDER_CREATE_REQUEST_SUCCESS } from '../actionTypes';

import { query, findRecord, createRecord } from '../asyncActions/index';

export const fetchAllOrder = () => {
  return function(dispatch) {
    dispatch(onStart())
    return query('order')
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e.response.data)))
  }
}

export const fetchOrder = (order_id) => {
  return function(dispatch) {
    return findRecord('order', order_id)
    .then(res => dispatch(createOrder(res.data)))
    .catch(e => dispatch(onError(e.response.data)))
  }
}

export const createOrder = (orderDetails) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('order', orderDetails)
    .then((res) => dispatch(orderCreated(res.data)))
    .catch((e) => dispatch(onError(e.response.data)))
  }
}

export const orderCreated = (payload) => {
  return {
    type: ORDER_CREATE_REQUEST_SUCCESS,
    payload: payload
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
    error: error
  }
}