import React from 'react'

import {FlatList} from 'react-native'

import Text from '../../../../components/Text'

import Work from '../../../../components/Work'

import work from '../../../../data/work.json'

import * as S from './styles'

const More = () => {
  const renderItem = ({item}) => (
    <S.MoreItem>
      <Work
        imagen={item.imagen}
        title={item.title}
        author={item.author}
        price={item.price}
      />
    </S.MoreItem>
  )

  return (
    <S.More>
      <S.MoreTop>
        <Text size="normal" color="black">
          Mas de F. Chopin
        </Text>

        <Text size="small" color="black">
          Ver todo
        </Text>
      </S.MoreTop>

      <FlatList
        data={work}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.More>
  )
}

export default More
