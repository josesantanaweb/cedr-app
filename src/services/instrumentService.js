import api from '../config/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const InstrumentServices = {
  getInstruments: async () => {
    const response = await api.get('instrument', {
      headers: {
        utv: `${await AsyncStorage.getItem('token')}`,
      },
    })
    return response
  },
}

export default InstrumentServices
