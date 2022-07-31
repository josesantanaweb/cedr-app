import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CollectionsService = {
  getCollections: async id => {
    const response = await api.get(`/collection/${id}`, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  addWorkToCollection: async data => {
    const response = await api.patch('/user/collection', data, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  addCollection: async data => {
    const response = await api.post('/user/collection', data, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default CollectionsService
