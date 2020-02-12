import { VALIDATION_INITIATED, VALIDATION_SUCCESS, SIGN_OUT, VALIDATION_FAILED, ON_LOGIN_INITIATED, ON_LOGIN_SUCCESS, ON_LOGIN_FAILED } from '../actionTypes';
import { userToken } from '../intialValues';

const authReducers = (state = userToken, action) => {
  switch (action.type) {
    case VALIDATION_INITIATED: {
      return {
        ...state,
        isLoading: true,
        isSignOut: true,
        userToken: null,
        error: null
      };
    }
    case VALIDATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSignOut: false,
        userToken: action.payload.token,
        error: null
      };
    }
    case VALIDATION_FAILED: {
      return {
        ...state,
        isLoading: false,
        isSignOut: true,
        userToken: null,
        error: action.error
      };
    }
    case SIGN_OUT: {
      return {
        isLoading: false,
        isSignOut: true,
        userToken: null,
        error: null
      };
    }
    case ON_LOGIN_INITIATED: {
      return {
        ...state,
        isLoading: true,
        userToken: null,
        isSignOut: true,
        error: null
      }
    }
    case ON_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userToken: null,
        isSignOut: true,
        error: null
      }
    }
    case ON_LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        userToken: null,
        isSignOut: true,
        error: action.error
      }
    }
    default: return state
  }
}

export default authReducers;