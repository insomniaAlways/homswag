import axios from 'axios';
const host = "http://a6304f72.ngrok.io/";

export function findAll(type, query) {
  let url = `${host}${type}`;
  if(query) {
    url = `${url}/?${query}`
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

function getRecord(url) {
  return axios.get(url)
  .then((response) => response)
  .catch((e) => {
    console.log(e)
    return e
  })
}