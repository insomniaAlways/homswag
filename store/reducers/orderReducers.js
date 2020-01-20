import { FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, FETCH_ORDER_ERROR } from '../actionTypes';
import { orders } from '../intialValues';
import _ from 'lodash';

const ordersReducers = (state = orders, action) => {
  switch(action.type) {
    case FETCH_ORDER_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_ORDER_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case FETCH_ORDER_ERROR : {
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