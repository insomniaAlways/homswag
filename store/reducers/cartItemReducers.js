import { FETCH_CARTITEM_REQUEST, FETCH_CARTITEM_SUCCESS, FETCH_CARTITEM_ERROR, MERGE_CARTITEMS } from '../actionTypes';
import { cartItems } from '../intialValues';
import _ from 'lodash';

const cartItemReducers = (state = cartItems, action) => {
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