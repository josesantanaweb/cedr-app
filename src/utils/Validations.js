import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthServices from '../services/authService'


export const viewPdf = async (item) => {
  const data = await AsyncStorage.getItem('dataUser')
  const dataObject = await JSON.parse(data)
  const uid = dataObject.user.id
  
  const dataUser = await AuthServices.getUser(uid)
  const { works } = dataUser.docs

  const isWork = works.find(d => item.id === d.id)
  
  if(isWork){
    return true
  }else{
    return false
  }
}