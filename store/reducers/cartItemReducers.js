import { FETCH_CARTITEM_REQUEST, FETCH_CARTITEM_SUCCESS, FETCH_CARTITEM_ERROR } from '../actionTypes';
import { categories } from '../intialValues';

const cartItemReducers = (state = categories, action) => {
  switch(action.type) {
    case FETCH_CARTITEM_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_CARTITEM_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case FETCH_CARTITEM_ERROR : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default cartItemReducers;