import { LOCATION_REQUEST_INITIATED, LOCATION_REQUEST_SUCCESS, LOCATION_REQUEST_FAILED } from '../actionTypes';
import _ from 'lodash';

const addressReducers = (state = {}, action) => {
  switch(action.type) {
    case LOCATION_REQUEST_INITIATED : {
      return {
        ...state,
        isLoading: true
      }
    }
    case LOCATION_REQUEST_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case LOCATION_REQUEST_FAILED : {
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