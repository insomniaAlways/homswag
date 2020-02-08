import axios from 'axios';
// const host = "http://192.168.0.105:1337/api/v1/";
const host = "https://homswag.herokuapp.com/api/v1";
const organization = "organization_id=2"
import Constants from 'expo-constants';

const axiosInstance = axios.create({
  baseURL: host
});

const createErrorObject = (error, message="Something went wrong") => {
  return {
    error: error,
    message: message
  }
}

export const initializeAxiosHeader = (token) => {
  try {
    if(token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } 
  catch (e) {
    return createErrorObject(e, "Header not added")
  }
}

//GET Calls
export function findAll(type, query) {
  let url = `/${type}`;
  if(query) {
    url = `${url}?${query}&${organization}`
  } else {
    url = `${url}?${organization}`
  }
  return getRecord(url)
}

export function query(type, query) {
  let url = `/${type}`;
  if(query) {
    url = `${url}?${query}&${organization}`
  } else {
    url = `${url}?${organization}`
  }
  return getRecord(url)
}

export function findRecord(type, id) {
  let url = `/${type}`;
  if(id) {
    url = `${url}/${id}`
  } else {
    url = `${url}`
  }
  return getRecord(url)
}

//Making GET call
function getRecord(url) {
  return axiosInstance.get(url)
  .then((response) => response)
  .catch((e) => {
    console.log(e)
    return e
  })
}

//POST Calls
export function createRecord(type, payload) {
  return axiosInstance.post(type, payload)
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    return error
  });
}

//PUT Calls
export function updateRecord(type, id, payload) {
  let url = `${type}/${id}`
  return axiosInstance.put(url, payload)
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    return error
  });
}

//DELETE Calls
export function deleteRecord(type, id, payload) {
  let url = `${type}/${id}`
  return axiosInstance.delete(url)
  .then(response => response)
  .catch(error => error)
}

export function getLocationDetails(latitude, longitude) {
  let key = Constants.manifest.android.config.googleMaps.apiKey
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`)
    .then((response) => response)
    .catch((error) => console.log(error))
}