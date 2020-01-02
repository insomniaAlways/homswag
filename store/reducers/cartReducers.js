import { FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_ERROR } from '../actionTypes';
import { categories } from '../intialValues';

const cartReducers = (state = categories, action) => {
  switch(action.type) {
    case FETCH_CART_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_CART_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload[0]
      }
    }
    case FETCH_CART_ERROR : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default cartReducers;