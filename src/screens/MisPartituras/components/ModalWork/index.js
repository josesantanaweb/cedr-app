import React, {useState, useEffect} from 'react'
import Text from '../../../../components/Text'
import Button from '../../../../components/Button'
import {useToast} from 'react-native-toast-notifications'
import Select from '../../../../components/Select'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserServices from '../../../../services/userService'
import CollectionServices from '../../../../services/collectionService'
import * as S from './styles'

const ModalWork = ({redirectDetail, closeModal, workSelected, navigation}) => {
  const toast = useToast()
  const [formCollectionActive, setFormCollectionActive] = useState(false)
  const [user, setUser] = useState()
  const [openSelectCollections, setOpenSelectCollections] = useState(false)
  const [collection, setCollection] = useState({})
  const [collectionData, setCollectionData] = useState([])
  const [workEdited, setWorkEdited] = useState([])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getUser()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getCollections()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection])

  const getUser = async () => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const userResponse = await UserServices.getUser(config.user.id)
      setUser(userResponse.data.docs)
      const data = userResponse.data.docs.collections.map(item => ({
        label: item.name,
        value: item.id,
      }))
      setCollectionData(data)
      if (userResponse !== undefined) {
        setCollection(data[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCollections = async () => {
    try {
      const colecciones = await CollectionServices.getCollections(
        collection.value
      )
      const createArray = colecciones.data.docs.works.map(item => item.id)
      setWorkEdited(createArray)
    } catch (error) {
      console.log(error)
    }
  }

  const saveWorkToCollection = async () => {
    try {
      const data = {
        user: user.id,
        id: collection.value,
        works: [...workEdited, workSelected.id],
      }
      await CollectionServices.addWorkToCollection(data)
      toast.show('Partitura agregada con exito!', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      navigation.navigate('Mis Partituras')
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  const hanleOpenSelectCollections = () =>
    setOpenSelectCollections(!openSelectCollections)

  const hanleSelectedCollections = opt => {
    setCollection(opt)
    setOpenSelectCollections(false)
  }
  return (
    <S.Modal>
      {!formCollectionActive ? (
        <S.Options>
          <S.Option onPress={redirectDetail}>
            <Text size="small" color="black" align="center">
              Ver Informacion
            </Text>
          </S.Option>
          <S.Option onPress={() => setFormCollectionActive(true)}>
            <Text size="small" color="black" align="center">
              Agregar a coleccion
            </Text>
          </S.Option>
          <S.Close onPress={closeModal}>
            <Text size="small" color="black" align="center">
              Cancelar
            </Text>
          </S.Close>
        </S.Options>
      ) : (
        <S.Form>
          <S.Option onPress={redirectDetail}>
            <Select
              option={collection}
              data={collectionData}
              open={openSelectCollections}
              hanleSelected={hanleSelectedCollections}
              hanleOpen={hanleOpenSelectCollections}
              label="Instrumento"
            />
            <S.Footer>
              <Button label="Guardar" onPress={saveWorkToCollection} />
            </S.Footer>
          </S.Option>
          <S.Close onPress={closeModal}>
            <Text size="small" color="black" align="center">
              Cancelar
            </Text>
          </S.Close>
        </S.Form>
      )}
    </S.Modal>
  )
}

export default ModalWork
