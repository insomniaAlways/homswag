import { FETCH_AUTHORISATION_REQUEST, FETCH_AUTHORISATION_SUCCESS, FETCH_AUTHORISATION_ERROR } from '../actionTypes';
import { auth } from '../intialValues';

const authReducers = (state = auth, action) => {
  switch(action.type) {
    case FETCH_AUTHORISATION_REQUEST : {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_AUTHORISATION_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case FETCH_AUTHORISATION_ERROR : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default authReducers;