import React, {useState, useEffect} from 'react'
import {Dimensions, FlatList, Modal} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserServices from '../../../../services/userService'
import Text from '../../../../components/Text'
import AddCollection from '../AddCollection'

import * as S from './styles'

const Folders = ({navigation}) => {
  const [collections, setCollections] = useState()
  const [modal, setModal] = useState(false)
  const width = Dimensions.get('window').width
  const movil = width < 500

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

  const getUser = async () => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const user = await UserServices.getUser(config.user.id)
      setCollections(user.data.docs.collections)
    } catch (error) {
      console.log(error)
    }
  }

  const renderItem = ({item}) => {
    const handleNavigate = () => {
      navigation.navigate('CollectionWork', {
        item: item,
      })
    }
    return (
      <S.Item onPress={handleNavigate}>
        <Text color="black">{item.name}</Text>
      </S.Item>
    )
  }

  return (
    <S.Folders>
      <S.AddCollection onPress={() => setModal(true)}>
        <Icon name="collections" size={14} color="white" />
        <S.AddCollectionLabel>
          <Text color="white">Agregar Collecion</Text>
        </S.AddCollectionLabel>
      </S.AddCollection>
      <S.List>
        <FlatList
          style={{zIndex: -10}}
          scrollEventThrottle={16}
          data={collections}
          scrollEnabled={true}
          numColumns={movil ? 3 : 5}
          keyExtractor={item => item.name}
          key={'h'}
          renderItem={renderItem}
        />
      </S.List>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal)
        }}>
        <AddCollection closeModal={() => setModal(false)} getUser={getUser} />
      </Modal>
    </S.Folders>
  )
}

export default Folders
