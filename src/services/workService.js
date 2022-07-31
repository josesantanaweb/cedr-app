import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WorkServices = {
  getWorks: async (query, available) => {
    const response = await api.get(
      `/work?available=${available}&search=${query || ''}`,
      {
        headers: {
          utv: `${await AsyncStorage.getItem('token')}`,
        },
      }
    )
    return response
  },
  getWorksEditorials: async (query, available, editorialsId) => {
    const response = await api.get(
      `/work?available=${available}&publisher=${editorialsId}&search=${
        query || ''
      }`,

      {
        headers: {
          utv: `${await AsyncStorage.getItem('token')}`,
        },
      }
    )
    return response
  },
  getWorksAuthor: async (query, available, authorId) => {
    const response = await api.get(
      `/work?available=${available}&author=${authorId}&search=${query || ''}`,

      {
        headers: {
          utv: `${await AsyncStorage.getItem('token')}`,
        },
      }
    )
    return response
  },
  getWorkPartitoteca: async () => {
    const response = await api.get('/work?available=platform', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  getWorkNew: async query => {
    const response = await api.get('/work/new', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  getWorkTop: async query => {
    const response = await api.get('/collection/topsales', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  getWorkForAuthor: async (query, available, authorId) => {
    const response = await api.get(
      `/work?available=${available}&author=${authorId}&search=${query || ''}`,
      {
        headers: {
          utv: `${await AsyncStorage.getItem('token')}`,
        },
      }
    )
    return response
  },
  getWorkForEditorials: async (id, q) => {
    const response = await api.get(`/work?publisher=${id}&search=${q}`, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  getWorkForUser: async id => {
    const response = await api.get(`/user/${id}`, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  addWorktoUser: async data => {
    const response = await api.post('/user/worktouser', data, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default WorkServices
