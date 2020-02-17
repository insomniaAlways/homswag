import { SESSION_AUTHENTICATED, SESSION_AUTHENTICATING, SESSION_AUTHENTICATION_FAILED, SESSION_UNAUTHENTICATED, SESSION_UNAUTHENTICATING, SESSION_UNAUTHENTICATION_FAILED } from '../actionTypes';
import { session } from '../intialValues';

const sessionReducers = (state = session, action) => {
  switch (action.type) {
    case SESSION_AUTHENTICATING: {
      return {
        ...state,
        isSessionExpired: false,
        isSessionAuthenticated: false,
        isSessionUnauthenticated: true,
        error: null
      }
    }
    case SESSION_AUTHENTICATED: {
      return {
        ...state,
        isSessionExpired: false,
        isSessionAuthenticated: true,
        isSessionUnauthenticated: false,
        token: token,
        error: action.error
      }
    }
    case SESSION_AUTHENTICATION_FAILED: {
      return {
        ...state,
        isSessionExpired: false,
        isSessionAuthenticated: false,
        isSessionUnauthenticated: true,
        error: null
      }
    }
    case SESSION_UNAUTHENTICATING: {
      return {
        ...state,
        error: null
      }
    }
    case SESSION_UNAUTHENTICATED: {
      return {
        ...state,
        isSessionExpired: false,
        isSessionAuthenticated: false,
        isSessionUnauthenticated: true,
        token: null,
        error: null
      }
    }
    case SESSION_UNAUTHENTICATION_FAILED: {
      return {
        ...state,
        isSessionUnauthenticated: false,
        error: action.error
      }
    }
  }
}

export default sessionReducers;