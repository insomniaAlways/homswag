import axios from 'axios';
const host = "http://a6304f72.ngrok.io/";

export function findAll(type, query) {
  let url = `${host}${type}`;
  if(query) {
    url = `${url}/?${query}`
  }
  return axios.get(url)
  .then((response) => response)
  .catch((e) => console.log(e))
}