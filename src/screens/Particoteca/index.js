import React, {useState, useEffect} from 'react'
import {FlatList, Dimensions, Modal} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Search from '../../components/Search'
import Authors from './components/Authors'
import Work from '../../components/Work'
import FilterWork from '../../components/FilterWork'
import WorkService from '../../services/workService'
import UserServices from '../../services/userService'
import {View} from 'react-native'
import * as S from './styles'
import Alert from './components/Alert'
import {viewPdf} from '../../utils/Validations'

const Particoteca = ({navigation}) => {
  const [search, setSearch] = useState('')
  const [works, setWorks] = useState([])
  const width = Dimensions.get('window').width
  const [haveAccessToLicensedWorks, setHaveAccessToLicensedWorks] =
    useState(false)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getWorks()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getWorks = async () => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const user = await UserServices.getUser(config.user.id)
      setHaveAccessToLicensedWorks(user.data.docs.haveAccessToLicensedWorks)
      const work = await WorkService.getWorkPartitoteca()
      setWorks(work.data.docs)
    } catch (error) {}
  }

  const renderItem = ({item}) => {
    return (
      <S.Item
        onPress={() => {
          PdfNavigate(item)
        }}>
        <Work
          imagen={item.cover}
          onPress={() => {
            navigation.navigate('ParticotecaDetailWork', {
              item: item,
              particoteca: true,
            })
          }}
        />
      </S.Item>
    )
  }

  const PdfNavigate = async item => {
    const isWork = await viewPdf(item)

    if (isWork) {
      navigation.navigate('ParticotecaPdfView', {
        item: item,
      })
    } else {
      navigation.navigate('ParticotecaDetailWork', {
        item: item,
        particoteca: true,
      })
    }
  }

  return !haveAccessToLicensedWorks ? (
    <Alert />
  ) : (
    <S.Particoteca>
      <S.Top>
        <Search navigation={navigation} onChangeText={s => setSearch(s)} />
      </S.Top>
      {search.length < 1 ? (
        <View>
          <Authors navigation={navigation} />
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
          <FilterWork search={search} filterFor="Particoteca" />
        </View>
      )}
    </S.Particoteca>
  )
}

export default Particoteca
