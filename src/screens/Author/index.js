import React, {useState, useEffect} from 'react'
import {FlatList, Dimensions, View} from 'react-native'
import Text from '../../components/Text'
import Search from '../../components/Search'
import Work from '../../components/Work'
import FilterWork from '../../components/FilterWork'
import WorkService from '../../services/workService'

import * as S from './style'
import {viewPdf} from '../../utils/Validations'

const Author = ({route, navigation}) => {
  const {item: author, home, particoteca} = route.params
  const [works, setWorks] = useState([])
  const [search, setSearch] = useState('')
  const width = Dimensions.get('window').width
  const available = home ? 'sale' : 'platform'

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getWorks(search, available, author.id)
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getWorks = async (s, a, auth) => {
    try {
      const work = await WorkService.getWorkForAuthor(s, a, auth)
      setWorks(work.data.docs)
    } catch (error) {}
  }

  const redirectDetail = item => {
    if (home) {
      navigation.navigate('HomeDetailWork', {
        item: item,
        home: true,
        particoteca: false,
      })
    } else {
      navigation.navigate('ParticotecaDetailWork', {
        item: item,
        home: false,
        particoteca: true,
      })
    }
  }

  const renderItem = ({item}) => {
    return (
      <S.Item onPress={() => PdfNavigate(item)}>
        <Work imagen={item.cover} onPress={() => redirectDetail(item)} />
      </S.Item>
    )
  }

  const PdfNavigate = async item => {
    const isWork = await viewPdf(item)

    if (isWork) {
      if (home) {
        navigation.navigate('pdfView', {
          item: item,
        })
      } else {
        navigation.navigate('ParticotecaPdfView', {
          item: item,
        })
      }
    } else {
      if (home) {
        navigation.navigate('HomeDetailWork', {
          item: item,
          home: true,
          particoteca: false,
        })
      } else {
        navigation.navigate('ParticotecaDetailWork', {
          item: item,
          home: false,
          particoteca: true,
        })
      }
    }
  }

  return (
    <S.Detail>
      <S.Top>
        <S.TopSearch>
          <Search
            navigation={navigation}
            onChangeText={s => setSearch(s)}
            back={true}
          />
        </S.TopSearch>
        <S.Wrapper>
          <S.Description>
            <Text size="medium" color="black">
              {author.name}
            </Text>
            <Text size="small" color="black">
              {author.born} - {author.died}
            </Text>
            <S.Country>
              <Text size="small" color="white">
                {author.nationalities[0].name}
              </Text>
            </S.Country>
          </S.Description>
          <S.Cover source={{uri: author.cover}} />
        </S.Wrapper>
      </S.Top>

      {search.length === 0 ? (
        <View>
          <FlatList
            scrollEventThrottle={16}
            data={works}
            scrollEnabled={false}
            numColumns={width > 500 ? 5 : 3}
            keyExtractor={item => item.id}
            key={'h'}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <View>
          <FilterWork
            search={search}
            filterFor={home ? 'Home' : 'Particoteca'}
            authorId={author.id}
          />
        </View>
      )}
    </S.Detail>
  )
}

export default Author
