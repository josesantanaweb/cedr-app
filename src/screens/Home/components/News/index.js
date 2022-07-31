import React from 'react'
import {FlatList} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Work from '../../../../components/Work'
import Text from '../../../../components/Text'
import * as S from './styles'
import {viewPdf} from '../../../../utils/Validations'

const News = ({works}) => {
  const navigation = useNavigation()

  const renderItem = ({item}) => (
    <S.Item onPress={() => PdfNavigate(item)}>
      <Work
        imagen={item.cover}
        onPress={() =>
          navigation.navigate('HomeDetailWork', {
            item: item,
            home: true,
          })
        }
      />
    </S.Item>
  )

  const PdfNavigate = async item => {
    const isWork = await viewPdf(item)

    if (isWork) {
      navigation.navigate('pdfView', {
        item: item,
      })
    } else {
      navigation.navigate('HomeDetailWork', {
        item: item,
        home: true,
      })
    }
  }

  return (
    <S.News>
      <S.Top>
        <Text size="normal" color="black">
          Novedades
        </Text>
        <Text size="small" color="primary">
          Ver todo
        </Text>
      </S.Top>

      <FlatList
        data={works}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.News>
  )
}

export default News
