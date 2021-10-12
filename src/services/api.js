import axios from 'axios'
const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1/users',
  timeout: 3000
})

api.interceptors.request.use(async (config) => {
  // token manualmente
  const token =
    '6bd5e0b3da16b71731d7aa391f34e503d216989a54f2a5b1bf42f4171309cb6c'
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`
  }
  return config
})

export default api

/*
original 11/10/2021
import axios from 'axios'
const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1/users',
  timeout: 3000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export default api

*/
