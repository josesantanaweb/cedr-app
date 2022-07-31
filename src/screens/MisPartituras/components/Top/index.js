import React from 'react'

import Icon from 'react-native-vector-icons/Feather'

import {View} from 'react-native'

import Text from '../../../../components/Text'

import * as S from './styles'

const Top = ({setActions}) => {
  return (
    <S.Top>
      <S.Work>
        <S.Cover source={require('../../../../assets/img/editorials-01.png')} />

        <View size="normal" color="black">
          <Text size="normal" color="black">
            Preludio
          </Text>

          <Text size="small" color="gray">
            Pablo Sarate
          </Text>
        </View>

        <S.Close onPress={() => setActions(false)}>
          <Icon name="x" size={24} color="black" />
        </S.Close>
      </S.Work>
    </S.Top>
  )
}

export default Top
