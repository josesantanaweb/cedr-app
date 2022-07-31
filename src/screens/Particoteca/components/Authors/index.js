import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {FlatList} from 'react-native'
import {useDispatch} from 'react-redux'
import Text from '../../../../components/Text'
import Author from '../../../../components/Author'
import AuthorService from '../../../../services/authorService'
import {setAuthenticated} from '../../../../store/features/AuthSlice'
import * as S from './styles'

const Authors = ({navigation}) => {
  const dispatch = useDispatch()
  const [author, setAuthor] = useState([])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getAuthor()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAuthor = async () => {
    try {
      const authorData = await AuthorService.getAuthor()
      setAuthor(authorData.data.docs)
    } catch (error) {
      if (error.response.status === 401) {
        await AsyncStorage.removeItem('token')
        dispatch(setAuthenticated(false))
      }
    }
  }

  const renderItem = ({item}) => (
    <S.AuthorsItem
      onPress={() => {
        navigation.navigate('ParticotecaAuthor', {
          item: item,
          particoteca: true,
        })
      }}>
      <Author imagen={item.cover} name={item.name} />
    </S.AuthorsItem>
  )

  return (
    <S.Authors>
      <S.AuthorsTop>
        <Text size="medium" color="black">
          Autores
        </Text>

        <Text size="small" color="primary">
          Ver todo
        </Text>
      </S.AuthorsTop>

      <FlatList
        data={author}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.Authors>
  )
}

export default Authors
