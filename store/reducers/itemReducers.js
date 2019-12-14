import { FETCH_ITEMS, FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_ERROR } from '../actionTypes';
import { items } from '../intialValues';

const itemReducers = (state = items, action) => {
  switch(action.type) {
    case FETCH_ITEMS : {
      return {
        ...state,
        items:items
      }
    }
    case FETCH_ITEMS_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_ITEMS_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        items: action.payload
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