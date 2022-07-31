import React, {useState, useEffect} from 'react'
import {Dimensions, FlatList, View, Modal} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch, useSelector} from 'react-redux'

import Search from '../../components/Search'
import Work from '../../components/Work'
import WorkHorizontal from '../../components/WorkHorizontal'
import ModalWork from './components/ModalWork'
import Actions from './components/Actions'
import Filter from './components/Filter'
import Folders from './components/Folders'
import WorkService from '../../services/workService'
import UserServices from '../../services/userService'
import {setMispartituras} from '../../store/features/MispartiturasSlice'
import {mispartiturasSelector} from '../../store/selectors'

import * as S from './styles'

const MisPartituras = ({route, navigation}) => {
  const dispatch = useDispatch()
  const works = useSelector(mispartiturasSelector)
  const [search, setSearch] = useState('')
  const [list, setList] = useState(false)
  const [collection, setCollection] = useState(false)
  const [actions, setActions] = useState(false)
  const [filter, setFilter] = useState(false)
  const [filterOption, setFilterOption] = useState('')
  const width = Dimensions.get('window').width
  const tablet = width > 500
  const movil = width < 500

  const [modal, setModal] = useState(false)
  const [workSelected, setWorkSelected] = useState()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getWorks(filterOption)
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOption])

  const getWorks = async filtro => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const user = await UserServices.getUser(config.user.id)
      const worksData = await WorkService.getWorkForUser(config.user.id)

      const filterWork = worksData.data.docs.works
        .filter(w => user.data.docs.licensed.includes(w.id))
        .map(w => w)

      function removeSpecialCharacters(str) {
        return str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      }

      const recientes = [...filterWork].reverse()
      const title = filterWork.sort((a, b) => {
        if (
          removeSpecialCharacters(a.title) < removeSpecialCharacters(b.title)
        ) {
          return -1
        }
        if (
          removeSpecialCharacters(a.title) > removeSpecialCharacters(b.title)
        ) {
          return 1
        }
        return 0
      })
      const author = filterWork.sort((a, b) => {
        if (a.author.name.toLowerCase() < b.author.name.toLowerCase()) {
          return -1
        }
        if (a.author.name.toLowerCase() > b.author.name.toLowerCase()) {
          return 1
        }
        return 0
      })

      if (filtro === 'Recient') {
        dispatch(setMispartituras(recientes))
      } else if (filtro === 'Title') {
        dispatch(setMispartituras(title))
      } else if (filtro === 'Author') {
        dispatch(setMispartituras(author))
      } else {
        dispatch(setMispartituras(filterWork))
      }
    } catch (error) {}
  }

  const handleList = () => {
    setList(true)
    setCollection(false)
    setFilter(false)
  }

  const handleSquare = () => {
    setList(false)
    setCollection(false)
    setFilter(false)
  }

  const handleCollection = () => {
    setCollection(true)
    setFilter(false)
  }

  const handleRecient = () => {
    setFilterOption('Recient')
    setFilter(false)
  }

  const handleTitle = () => {
    setFilterOption('Title')
    setFilter(false)
  }

  const handleAuthor = () => {
    setFilterOption('Author')
    setFilter(false)
  }

  const viewPdf = item => {
    navigation.navigate('misPartituraPdfView', {
      item: item,
    })
  }

  const redirectDetail = () => {
    navigation.navigate('MisPartiturasDetailWork', {
      item: workSelected,
      particoteca: false,
      mispartituras: true,
    })
    setModal(false)
  }

  const renderItem = ({item}) => {
    return (
      <S.Item onPress={() => viewPdf(item)}>
        <Work
          imagen={item.cover}
          onPress={() => {
            setModal(true)
            setWorkSelected(item)
          }}
        />
      </S.Item>
    )
  }

  const renderItemList = ({item}) => {
    return (
      <S.ItemList onPress={() => viewPdf(item)}>
        <WorkHorizontal
          imagen={item.cover}
          title={item.title}
          author={item.author.name}
          instrumentation={item.instrumentation}
          onPress={() => {
            setModal(true)
            setWorkSelected(item)
          }}
        />
      </S.ItemList>
    )
  }

  return (
    <>
      <S.MisPartituras>
        <View>
          <S.TopSearch>
            <Search navigation={navigation} onChangeText={s => setSearch(s)} />
          </S.TopSearch>
          <S.Top>
            <Filter
              filter={filter}
              setFilter={() => setFilter(!filter)}
              handleList={handleList}
              handleCollection={handleCollection}
              handleSquare={handleSquare}
              handleRecient={handleRecient}
              handleTitle={handleTitle}
              handleAuthor={handleAuthor}
            />
          </S.Top>
        </View>
        {!collection ? (
          <FlatList
            style={{zIndex: -10}}
            scrollEventThrottle={16}
            data={works}
            scrollEnabled={true}
            numColumns={
              movil && !list ? 3 : movil && list ? 1 : tablet && !list ? 5 : 1
            }
            keyExtractor={item => item.title}
            key={list ? 'v' : 'h'}
            renderItem={list ? renderItemList : renderItem}
          />
        ) : (
          <Folders navigation={navigation} />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal)
          }}>
          <ModalWork
            redirectDetail={redirectDetail}
            workSelected={workSelected}
            closeModal={() => setModal(false)}
            navigation={navigation}
          />
        </Modal>
      </S.MisPartituras>
      {actions && <Actions setActions={setActions} />}
    </>
  )
}

export default MisPartituras
