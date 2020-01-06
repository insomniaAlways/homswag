import axios from 'axios';
// const host = "http://192.168.0.105:1337/api/v1/";
const host = "http://homswag.herokuapp.com/api/v1/";

//GET Calls
export function findAll(type, query) {
  let url = `${host}${type}`;
  if(query) {
    url = `${url}?${query}`
  }
  return getRecord(url)
}

export function query(type, query) {
  let url = `${host}${type}`;
  if(query) {
    url = `${url}?${query}`
  }
  return getRecord(url)
}

export function findRecord(type, id) {
  let url = `${host}${type}`;
  if(id) {
    url = `${url}/${id}`
  } else {
    url = `${url}`
  }
  return getRecord(url)
}
//Making GEt call
function getRecord(url) {
  return axios.get(url)
  .then((response) => response)
  .catch((e) => {
    console.log(e)
    return e
  })
}

//POST Calls
export function createRecord(type, payload) {
  let url = `${host}${type}`
  return axios.post(url, payload)
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    return error
  });
}

//PUT Calls
export function updateRecord(type, id, payload) {
  let url = `${host}${type}/${id}`
  return axios.put(url, payload)
  .then((response) => response)
  .catch((error) => {
    console.log(error);
    return error
  });
}

//DELETE Calls
export function deleteRecord(type, id, payload) {
  debugger
  let url = `${host}${type}/${id}`
  return axios.delete(url)
  .then(response => response)
  .catch(error => error)
}