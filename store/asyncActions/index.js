import axios from 'axios';
// const host = "http://192.168.0.105:1337/api/v1/";
const host = "https://homswag.herokuapp.com/api/v1";

const axiosInstance = axios.create({
  baseURL: host,
  headers: {
    "Content-Type": 'application/json',
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgwMzI5MDY0LCJleHAiOjE1ODA3NjEwNjR9.pm51bZjJlcRgmk4GpOj-j9FcJt9_9TEY_6UB0N9j5p8"
  }
});

//GET Calls
export function findAll(type, query) {
  // let url = `${host}${type}`;
  let url = `/${type}`;
  if(query) {
    url = `${url}?${query}`
  }
  return getRecord(url)
}

export function query(type, query) {
  // let url = `${host}${type}`;
  let url = `/${type}`;
  if(query) {
    url = `${url}?${query}`
  }
  return getRecord(url)
}

export function findRecord(type, id) {
  // let url = `${host}${type}`;
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