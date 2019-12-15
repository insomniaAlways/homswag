import axios from 'axios';
const host = "http://a6304f72.ngrok.io/";

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
    url = `${url}/?${query}`
  }
  return getRecord(url)
}

export function findRecord(type, id) {
  let url = `${host}${type}`;
  if(id) {
    url = `${url}/${id}`
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