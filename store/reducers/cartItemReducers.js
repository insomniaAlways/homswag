import { CARTITEM_REQUEST_INITIATED, CARTITEM_REQUEST_SUCCESS, CARTITEM_REQUEST_FAILED, MERGE_CARTITEMS } from '../actionTypes';
import { cartItems } from '../intialValues';
import _ from 'lodash';

const cartItemReducers = (state = cartItems, action) => {
  switch(action.type) {
    case CARTITEM_REQUEST_INITIATED : {
      return {
        ...state,
        isLoading: true
      }
    }
    case CARTITEM_REQUEST_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case CARTITEM_REQUEST_FAILED : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case MERGE_CARTITEMS : {
      if(_.find(state.values, ["id", payload.id])) {
        _.remove(state.values, ["id", payload.id])
      }
      return {
        ...state,
        values: [...state.values, action.payload]
      }
    }
    default : return state;
  }
}

export default cartItemReducers;