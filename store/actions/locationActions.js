import { LOCATION_REQUEST_INITIATED, LOCATION_REQUEST_SUCCESS, LOCATION_REQUEST_FAILED } from '../actionTypes';
import { getLocationDetails } from '../asyncActions/index';

export const geoCoding = (latitude, longitude) => {
  return function(dispatch) {
    dispatch(fetchLocationInitiated())
    return getLocationDetails(latitude, longitude)
    .then((response) => dispatch(fetchLocationSuccess(response.data)))
    .catch((e) => dispatch(fetchLocationFailed(e)))
  }
}

export const fetchLocationInitiated = () => {
  return {
    type: LOCATION_REQUEST_INITIATED
  }
}

export const fetchLocationSuccess = (payload) => {
  return {
    type: LOCATION_REQUEST_SUCCESS,
    payload: payload
  }
}

export const fetchLocationFailed = (payload) => {
  return {
    type: LOCATION_REQUEST_FAILED,
    payload: payload
  }
}
