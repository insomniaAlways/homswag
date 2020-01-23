import { ORDER_REQUEST_INITIATED, ORDER_REQUEST_SUCCESS, ORDER_REQUEST_FAILED } from '../actionTypes';
import { orders } from '../intialValues';
import _ from 'lodash';

const ordersReducers = (state = orders, action) => {
  switch(action.type) {
    case ORDER_REQUEST_INITIATED : {
      return {
        ...state,
        isLoading: true
      }
    }
    case ORDER_REQUEST_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case ORDER_REQUEST_FAILED : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default ordersReducers;