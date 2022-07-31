import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apiepartitura.rollingscores.io',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,PATCH,DELETE',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  },
})

export default api
