import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditorialsService = {
  getEditorials: async () => {
    const response = await api.get('/publisher', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default EditorialsService
