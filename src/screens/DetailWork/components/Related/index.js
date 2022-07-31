import React from 'react'

import {FlatList} from 'react-native'

import Text from '../../../../components/Text'

import Work from '../../../../components/Work'

import work from '../../../../data/work.json'

import * as S from './styles'

const Related = () => {
  const renderItem = ({item}) => (
    <S.RelatedItem>
      <Work
        imagen={item.imagen}
        title={item.title}
        author={item.author}
        price={item.price}
      />
    </S.RelatedItem>
  )

  return (
    <S.Related>
      <S.RelatedTop>
        <Text size="normal" color="black">
          Obras relacionadas
        </Text>

        <Text size="small" color="black">
          Ver todo
        </Text>
      </S.RelatedTop>

      <FlatList
        data={work}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.Related>
  )
}

export default Related
