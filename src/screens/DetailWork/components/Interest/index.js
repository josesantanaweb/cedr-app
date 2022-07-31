import React from 'react'

import {FlatList} from 'react-native'

import Text from '../../../../components/Text'

import Work from '../../../../components/Work'

import work from '../../../../data/work.json'

import * as S from './styles'

const Interest = () => {
  const renderItem = ({item}) => (
    <S.InterestItem>
      <Work
        imagen={item.imagen}
        title={item.title}
        author={item.author}
        price={item.price}
      />
    </S.InterestItem>
  )

  return (
    <S.Interest>
      <S.InterestTop>
        <Text size="normal" color="black">
          Quizás te interese
        </Text>

        <Text size="small" color="black">
          Ver todo
        </Text>
      </S.InterestTop>

      <FlatList
        data={work}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.Interest>
  )
}

export default Interest
