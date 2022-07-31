import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Authors from './components/Authors'
import Editorials from './components/Editorials'
import TopSales from './components/TopSales'
import News from './components/News'
import Search from '../../components/Search'
import Genres from './components/Genres'
import FilterWork from '../../components/FilterWork'
import WorkService from '../../services/workService'
import {setAuthenticated} from '../../store/features/AuthSlice'

import * as S from './styles'

const Home = ({navigation}) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [worksNew, setWorksNew] = useState([])
  const [worksTop, setWorksTop] = useState([])

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
      const workNew = await WorkService.getWorkNew(s)
      const workTop = await WorkService.getWorkTop(s)
      setWorksNew(workNew.data.docs)
      setWorksTop(workTop.data.docs.works)
    } catch (error) {
      if (error.response.status === 401) {
        await AsyncStorage.removeItem('token')
        dispatch(setAuthenticated(false))
      }
    }
  }

  return (
    <S.Home>
      <S.Top>
        <Search navigation={navigation} onChangeText={s => setSearch(s)} />
      </S.Top>
      {search.length < 1 ? (
        <View>
          <Editorials navigation={navigation} />
          <TopSales works={worksTop} />
          <Authors navigation={navigation} />
          <News works={worksNew} />
          <Genres />
        </View>
      ) : (
        <View>
          <FilterWork search={search} filterFor="Home" />
        </View>
      )}
    </S.Home>
  )
}

export default Home
