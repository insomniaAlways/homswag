import { APPOINTMENT_REQUEST_INITIATED, APPOINTMENT_REQUEST_SUCCESS, APPOINTMENT_REQUEST_FAILED } from '../actionTypes';
import { appointment } from '../intialValues';
import _ from 'lodash';

const appointmentReducers = (state = appointment, action) => {
  switch(action.type) {
    case APPOINTMENT_REQUEST_INITIATED : {
      return {
        ...state,
        isLoading: true
      }
    }
    case APPOINTMENT_REQUEST_SUCCESS : {
      return {
        ...state,
        isLoading: false,
        values: action.payload
      }
    }
    case APPOINTMENT_REQUEST_FAILED : {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default : return state;
  }
}

export default appointmentReducers;