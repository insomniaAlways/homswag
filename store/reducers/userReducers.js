import { USER_REQUEST_INITIATED, USER_REQUEST_SUCCESS, USER_REQUEST_FAILED} from '../actionTypes';
import { currentUser } from '../intialValues';
const userReducers = (state=currentUser, action) => {
  switch (action.type) {
    case USER_REQUEST_INITIATED: {
      return {
        ...state,
        isLoading: true
      }
    }
    case USER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case USER_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    default: return state;
  }
}

export default userReducers;