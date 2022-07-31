import React, {useContext} from 'react'

import {ThemeContext} from 'styled-components'

import Text from '../../components/Text'

import Icon from 'react-native-vector-icons/FontAwesome'

import * as S from './styles'

const Collection = ({navigation}) => {
  const {colors} = useContext(ThemeContext)

  return (
    <S.Collection>
      <S.Back onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={24} color={colors.black} />

        <Text color="black" size="medium">
          Carpeta
        </Text>
      </S.Back>

      <S.Top>
        <Text size="large" color="black" family="primary">
          Mis Colleciones
        </Text>
      </S.Top>

      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          PDF
        </Text>

        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Descargas
        </Text>

        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Iniciacion Violin
        </Text>

        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Nueva Coleccion
        </Text>

        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
    </S.Collection>
  )
}

export default Collection
