import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import Text from '../../../../components/Text'
import GenresService from '../../../../services/genreService'
import * as S from './styles'

const Genres = ({navigation}) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getGenres()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getGenres = async () => {
    try {
      const genreData = await GenresService.getGenres()
      setGenres(genreData.data.genre)
    } catch (error) {}
  }

  const renderItem = ({item}) => {
    return (
      <S.GenresItem>
        <Text size="large" color="white">
          {item.name}
        </Text>
      </S.GenresItem>
    )
  }

  return (
    <S.Genres>
      <S.GenresTop>
        <Text size="normal" color="black">
          Generos
        </Text>
      </S.GenresTop>

      <FlatList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.Genres>
  )
}

export default Genres
