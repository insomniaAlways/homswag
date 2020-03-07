import { SESSION_AUTHENTICATED, SESSION_AUTHENTICATING, SESSION_AUTHENTICATION_FAILED, SESSION_UNAUTHENTICATED, SESSION_UNAUTHENTICATION_FAILED, SESSION_UNAUTHENTICATING } from '../actionTypes';
import { AsyncStorage } from 'react-native';

export const setSessionAuthenticated = (token) => {
  return async function(dispatch) {
    try {
      dispatch(settingSessionAuthenticating())
      await AsyncStorage.setItem('token', token)
      return dispatch(setSessionAuthenticatedSuccess(token))
    } catch (error) {
      return dispatch(setSessionAuthenticationFailed(error))
    }
  }
}

const setSessionAuthenticatedSuccess = (token) => {
  return {
    type: SESSION_AUTHENTICATED,
    token: token
  }
}

const settingSessionAuthenticating = () => {
  return {
    type: SESSION_AUTHENTICATING,
  }
}

const setSessionAuthenticationFailed = (error) => {
  return {
    type: SESSION_AUTHENTICATION_FAILED,
    isAuthenticating: false,
    error: error
  }
}

export const setSessionUnauthenticated = () => {
  return async function(dispatch) {
    try {
      dispatch(setSessionUnauthenticating())
      await AsyncStorage.removeItem('token')
      return dispatch(setSessionUnauthenticatSuccess())
    } catch (error) {
      return dispatch(setSessionUnauthenticatFailed(error))
    }
  }
}

const setSessionUnauthenticating = () => {
  return {
    type: SESSION_UNAUTHENTICATING
  }
}

const setSessionUnauthenticatSuccess = () => {
  return {
    type: SESSION_UNAUTHENTICATED,
  }
}

const setSessionUnauthenticatFailed= (error) => {
  return {
    type: SESSION_UNAUTHENTICATION_FAILED,
    error: error
  }
}