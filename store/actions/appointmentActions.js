import { APPOINTMENT_REQUEST_FAILED, APPOINTMENT_REQUEST_INITIATED, APPOINTMENT_REQUEST_SUCCESS, MERGE_CARTITEMS } from '../actionTypes';

import { query, createRecord, updateRecord, deleteRecord } from '../asyncActions/index';
import moment from 'moment';

const defaultRange = {
  startsAt = moment().toISOString(),
  endsAt = moment().add(1, 'weeks').toISOString()
}
export const fetchAppointment = (startsAt = defaultRange.startsAt, endsAt = defaultRange.endsAt) => {
  return function(dispatch) {
    dispatch(onStart())
    return query('appointment', { startsAt: startsAt, endsAt: endsAt })
    .then((response) => dispatch(onSuccess(response.data)))
    .catch((e) => dispatch(onError(e)))
  }
}

export const creatAppointment = (address) => {
  return function(dispatch) {
    dispatch(onStart())
    return createRecord('appointment', address)
    .then((response) => onSuccess(response))
    .catch(error => dispatch(onError(error)))
  }
}

export const updateAppointment = (selectedCartItem, quantity, totalPrice) => {
  return function(dispatch) {
    dispatch(onStart())
    let cartItem = {
      ...selectedCartItem,
      "quantity": quantity,
      "total_price": totalPrice,
    }
    return updateRecord('appointment', selectedCartItem.id, cartItem)
    .then((response) => dispatch(mergeItems(response.data)))
    .catch(error => dispatch(onError(error)))
  }
}

export const deleteItem = (selectedCartItem) => {
  return function(dispatch) {
    dispatch(onStart())
    return deleteRecord('appointment', selectedCartItem.id)
    .then((response) => fetchCartItems())
    .catch(error => dispatch(onError(error)))
  }
}

export const onStart = () => {
  return {
    type: APPOINTMENT_REQUEST_INITIATED
  }
}

export const onSuccess = (payload) => {
  return {
    type: APPOINTMENT_REQUEST_SUCCESS,
    payload: payload
  }
}

export const onError = (error) => {
  return {
    type: APPOINTMENT_REQUEST_FAILED,
    payload: error
  }
}

export const mergeItems = (payload) => {
  return {
    type: MERGE_CARTITEMS,
    payload: payload
  }
}