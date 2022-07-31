import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserServices = {
  getUser: async id => {
    const response = await api.get(`/user/${id}`, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
  updateUser: async (id, data) => {
    const response = await api.patch(`/user/${id}`, data, {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default UserServices
