import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR } from '../actionTypes';
import { categories } from '../intialValues';

const itemReducers = (state = categories, action) => {
  switch(action.type) {
    case FETCH_CATEGORY_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_CATEGORY_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case FETCH_CATEGORY_ERROR : {
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