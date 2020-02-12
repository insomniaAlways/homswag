import { ADDRESS_REQUEST_INITIATED, ADDRESS_REQUEST_SUCCESS, ADDRESS_REQUEST_FAILED } from '../actionTypes';
import { addresses } from '../intialValues';
import _ from 'lodash';

const addressReducers = (state = addresses, action) => {
  switch(action.type) {
    case ADDRESS_REQUEST_INITIATED : {
      return {
        ...state,
        isLoading: true,
        values: []
      }
    }
    case ADDRESS_REQUEST_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case ADDRESS_REQUEST_FAILED : {
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