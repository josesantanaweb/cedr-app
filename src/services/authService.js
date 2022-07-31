import api from '../config/api'

const AuthServices = {
  login: async data => {
    const response = await api.post('auth/login', data)
    return response.data
  },
  register: async data => {
    const response = await api.post('/user', data)
    return response.data
  },
  getUser: async data => {
    const response = await api.get(`/user/${data}`)
    return response.data
  },
}

export default AuthServices
