import React, {useState, useEffect} from 'react'
import {Dimensions, FlatList, View} from 'react-native'

import Search from '../../../../components/Search'
import Work from '../../../../components/Work'
import CollectionsService from '../../../../services/collectionService'

import * as S from './styles'

const CollectionWork = ({route, navigation}) => {
  const {item: collection} = route.params
  const [search, setSearch] = useState('')
  const [works, setWorks] = useState([])
  const width = Dimensions.get('window').width
  const movil = width < 500

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getCollections()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCollections = async () => {
    try {
      const response = await CollectionsService.getCollections(collection.id)
      setWorks(response.data.docs.works)
    } catch (error) {
      console.log(error)
    }
  }

  const viewPdf = item => {
    navigation.navigate('misPartituraPdfView', {
      item: item,
      mispartituras: true,
    })
  }

  const renderItem = ({item}) => {
    return (
      <S.Item onPress={() => viewPdf(item)}>
        <Work
          imagen={item.cover}
          onPress={() =>
            navigation.navigate('MisPartiturasDetailWork', {
              item: item,
              particoteca: false,
              mispartituras: true,
            })
          }
        />
      </S.Item>
    )
  }

  return (
    <>
      <S.CollectionWork>
        <View>
          <S.TopSearch>
            <Search navigation={navigation} onChangeText={s => setSearch(s)} />
          </S.TopSearch>
        </View>
        <FlatList
          style={{zIndex: -10}}
          scrollEventThrottle={16}
          data={works}
          scrollEnabled={true}
          numColumns={movil ? 3 : 5}
          keyExtractor={item => item.name}
          key={'h'}
          renderItem={renderItem}
        />
      </S.CollectionWork>
    </>
  )
}

export default CollectionWork
