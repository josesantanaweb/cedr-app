import React, {useContext} from 'react'
import {View} from 'react-native'
import {ThemeContext} from 'styled-components'

import Text from '../../components/Text'

import Icon from 'react-native-vector-icons/FontAwesome'

import * as S from './styles'

const Setting = ({navigation}) => {
  const {colors} = useContext(ThemeContext)

  return (
    <S.Setting>
      <S.Back onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={24} color={colors.black} />
        <Text color="black" size="medium">
          Mas
        </Text>
      </S.Back>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Notificaciones
        </Text>
        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Versión
        </Text>
        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Condiciones de uso
        </Text>
        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Notas legales
        </Text>
        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Aviso de privacidad
        </Text>
        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
      <S.MenuItem onPress={() => navigation.navigate('Profile')}>
        <Text size="medium" color="black">
          Aviso de cookies
        </Text>
        <Icon name="angle-right" size={24} color={colors.grayDark} />
      </S.MenuItem>
    </S.Setting>
  )
}

export default Setting
