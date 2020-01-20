import { FETCH_ITEMS, ITEM_REQUEST_INITIATED, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_ERROR } from '../actionTypes';
import { items } from '../intialValues';

const itemReducers = (state = items, action) => {
  switch(action.type) {
    case ITEM_REQUEST_INITIATED : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_ITEMS_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case FETCH_ITEMS_ERROR : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default itemReducers;