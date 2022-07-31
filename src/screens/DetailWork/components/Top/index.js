import React from 'react'

import Icon from 'react-native-vector-icons/Feather'

import Text from '../../../../components/Text'

import * as S from './styles'

const Top = ({navigation, item}) => {
  return (
    <S.Top>
      <S.Close onPress={() => navigation.goBack()}>
        <Icon name="x" size={24} color="black" />
      </S.Close>

      <S.Cover source={{uri: item.cover}} />

      <Text size="large" color="black" family="primary">
        {item.title}
      </Text>

      <Text size="normal" color="black">
        {item.author.name}
      </Text>

      <Text size="normal" color="gray">
        {item.instrumentation}
      </Text>
    </S.Top>
  )
}

export default Top
