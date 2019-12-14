import axios from 'axios';

export function findAll(type) {
  return axios.get(`http://a6304f72.ngrok.io/${type}`)
  .then((response) => response)
  .catch((e) => console.log(e))
}