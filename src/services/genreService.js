import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GenreServices = {
  getGenres: async () => {
    const response = await api.get('genre', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default GenreServices
