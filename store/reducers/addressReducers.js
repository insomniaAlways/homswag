import { FETCH_ADDRESSS_REQUEST, FETCH_ADDRESSS_SUCCESS, FETCH_ADDRESSS_ERROR } from '../actionTypes';
import { addresses } from '../intialValues';
import _ from 'lodash';

const addressReducers = (state = addresses, action) => {
  switch(action.type) {
    case FETCH_ADDRESSS_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_ADDRESSS_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case FETCH_ADDRESSS_ERROR : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default addressReducers;