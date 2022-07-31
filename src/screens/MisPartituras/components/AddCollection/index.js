import React, {useState} from 'react'
import Text from '../../../../components/Text'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../../../../components/Input'
import {useToast} from 'react-native-toast-notifications'
import CollectionServices from '../../../../services/collectionService'

import * as S from './styles'

const AddCollection = ({closeModal, getUser}) => {
  const toast = useToast()
  const [name, setName] = useState()

  const saveCollection = async () => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const data = {
        user: config.user.id,
        name: name,
      }
      await CollectionServices.addCollection(data)
      toast.show('Collecion agregada con exito!', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      getUser()
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <S.Modal>
      <S.Options>
        <S.InputRow>
          <Input
            placeholder="Ej. Piano"
            label="Nombre de Coleccion"
            onChangeText={s => setName(s)}
          />
        </S.InputRow>
        <S.Option onPress={saveCollection}>
          <Text size="small" color="primary" align="center">
            Guardar
          </Text>
        </S.Option>
        <S.Close onPress={closeModal}>
          <Text size="small" color="black" align="center">
            Cancelar
          </Text>
        </S.Close>
      </S.Options>
    </S.Modal>
  )
}

export default AddCollection
