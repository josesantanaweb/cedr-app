import React, {useState, useEffect} from 'react'
import {FlatList, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Work from '../Work'
import WorkService from '../../services/workService'
import * as S from './styles'
import PropTypes from 'prop-types'
import {viewPdf} from '../../utils/Validations'

const FilterWork = ({search, filterFor, authorId, editorialsId}) => {
  const navigation = useNavigation()
  const [works, setWorks] = useState([])
  const width = Dimensions.get('window').width
  const available = filterFor === 'Home' ? 'sale' : 'platform'

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getWorks(search, available, authorId, editorialsId)
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const getWorks = async (s, a, auth, edit) => {
    if (auth) {
      try {
        const work = await WorkService.getWorksAuthor(s, a, auth)
        setWorks(work.data.docs)
      } catch (error) {}
    } else if (edit) {
      try {
        const work = await WorkService.getWorksEditorials(s, a, edit)
        setWorks(work.data.docs)
      } catch (error) {}
    } else {
      try {
        const work = await WorkService.getWorks(s, a)
        setWorks(work.data.docs)
      } catch (error) {}
    }
  }

  const redirectDetail = item => {
    if (filterFor === 'Home') {
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

  const renderItem = ({item}) => (
    <S.Item onPress={() => PdfNavigate(item)}>
      <Work imagen={item.cover} onPress={() => redirectDetail(item)} />
    </S.Item>
  )

  const PdfNavigate = async item => {
    const isWork = await viewPdf(item)

    if (isWork) {
      switch (filterFor) {
        case 'Home':
          navigation.navigate('pdfView', {
            item: item,
            home: true,
          })
          break
        case 'Particoteca':
          navigation.navigate('ParticotecaPdfView', {
            item: item,
            particoteca: true,
          })
          break
        default:
          navigation.navigate('MisPartiturasPdfView', {
            item: item,
            mispartituras: true,
          })
          break
      }
    } else {
      switch (filterFor) {
        case 'Home':
          navigation.navigate('HomeDetailWork', {
            item: item,
            home: true,
          })
          break
        case 'Particoteca':
          navigation.navigate('ParticotecaDetailWork', {
            item: item,
            particoteca: true,
          })
          break
        default:
          navigation.navigate('MisPartiturasDetailWork', {
            item: item,
            mispartituras: true,
          })
          break
      }
    }
  }

  return (
    <S.FilterWork>
      <FlatList
        scrollEventThrottle={16}
        data={works}
        scrollEnabled={false}
        numColumns={width > 500 ? 5 : 3}
        keyExtractor={item => item.id}
        key={'h'}
        renderItem={renderItem}
      />
    </S.FilterWork>
  )
}

FilterWork.propTypes = {
  search: PropTypes.string,
}

FilterWork.defaultProps = {
  search: '',
}

export default FilterWork
