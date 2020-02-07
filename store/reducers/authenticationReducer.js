import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from '../actionTypes';
import { userToken } from '../intialValues';

const authReducers = (state = userToken, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: undefined,
      };
    default: return state
  }
}

export default authReducers;