import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT, ON_ERROR } from '../actionTypes';
import { userToken } from '../intialValues';

const authReducers = (state = userToken, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        isSignout: false,
        userToken: null,
        isLoading: true,
      };
    case SIGN_IN:
      return {
        ...state,
        isLoading: false,
        isSignout: false,
        userToken: action.payload.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoading: false,
        isSignout: true,
        userToken: undefined,
      };
    case ON_ERROR:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        error: action.error
      };
    default: return state
  }
}

export default authReducers;