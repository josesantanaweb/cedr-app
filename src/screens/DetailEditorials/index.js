import React, {useState, useEffect} from 'react'
import {FlatList, Dimensions, View, TouchableOpacity} from 'react-native'
import Text from '../../components/Text'
import FilterWork from '../../components/FilterWork'
import Search from '../../components/Search'
import Work from '../../components/Work'
import WorkService from '../../services/workService'

import * as S from './styles'

const DetailEditorials = ({route, navigation}) => {
  const {item: editorials} = route.params
  const [works, setWorks] = useState([])
  const [search, setSearch] = useState('')
  const width = Dimensions.get('window').width

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getWorks(search)
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const getWorks = async s => {
    try {
      const work = await WorkService.getWorkForEditorials(editorials.id, s)
      const filterWork = work.data.docs.filter(item =>
        item.available.includes('sale')
      )
      setWorks(filterWork)
    } catch (error) {}
  }

  const renderItem = ({item}) => {
    return (
      <S.Item>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeDetailWork', {
              item: item,
              home: true,
            })
          }>
          <Work
            imagen={item.cover}
            onPress={() =>
              navigation.navigate('HomeDetailWork', {
                item: item,
                home: true,
              })
            }
          />
        </TouchableOpacity>
      </S.Item>
    )
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
              {editorials.name}
            </Text>
          </S.Description>
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
            filterFor="Home"
            editorialsId={editorials.id}
          />
        </View>
      )}
    </S.Detail>
  )
}

export default DetailEditorials
