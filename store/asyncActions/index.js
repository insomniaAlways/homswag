import axios from 'axios';

export function findAll(dispatch, type) {
  return axios.get(`http://a6304f72.ngrok.io/${type}`)
  .then((response) => {
    console.log(response)
    return response
  }).catch((e) => {
    console.log(e)
  })
}