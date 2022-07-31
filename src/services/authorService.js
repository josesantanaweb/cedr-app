import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthorServices = {
  getAuthor: async () => {
    const response = await api.get('/author', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default AuthorServices
