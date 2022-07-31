import React, {useState, useContext} from 'react'
import {useDispatch} from 'react-redux'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {ThemeContext} from 'styled-components'
import Text from '../../components/Text'
import Icon from 'react-native-vector-icons/FontAwesome'
import {setAuthenticated} from '../../store/features/AuthSlice'

import * as S from './styles'

const Profile = ({navigation}) => {
  const dispatch = useDispatch()
  const {colors} = useContext(ThemeContext)

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    dispatch(setAuthenticated(false))
  }

  return (
    <S.More>
      <S.Top>
        <Text size="large" color="black" family="primary">
          Más
        </Text>
      </S.Top>
      <S.Menu>
        <S.MenuItem onPress={() => navigation.navigate('Profile')}>
          <View style={{flexDirection: 'row'}}>
            <S.MenuIcon>
              <Icon name="user-circle-o" size={24} color={colors.primary} />
            </S.MenuIcon>
            <Text size="medium" color="primary">
              Mi Perfil
            </Text>
          </View>
          <Icon name="angle-right" size={24} color={colors.grayDark} />
        </S.MenuItem>
        <S.MenuItem onPress={() => navigation.navigate('Setting')}>
          <View style={{flexDirection: 'row'}}>
            <S.MenuIcon>
              <Icon name="cog" size={24} color={colors.primary} />
            </S.MenuIcon>
            <Text size="medium" color="primary">
              Configuración
            </Text>
          </View>
          <Icon name="angle-right" size={24} color={colors.grayDark} />
        </S.MenuItem>
        <S.MenuItem>
          <View style={{flexDirection: 'row'}}>
            <S.MenuIcon>
              <Icon name="question-circle-o" size={24} color={colors.primary} />
            </S.MenuIcon>
            <Text size="medium" color="primary">
              Ayuda
            </Text>
          </View>
          <Icon name="angle-right" size={24} color={colors.grayDark} />
        </S.MenuItem>
        <S.MenuItem onPress={handleLogout}>
          <View style={{flexDirection: 'row'}}>
            <S.MenuIcon>
              <Icon name="sign-out" size={24} color={colors.primary} />
            </S.MenuIcon>
            <Text size="medium" color="primary">
              Salir
            </Text>
          </View>
          <Icon name="angle-right" size={24} color={colors.grayDark} />
        </S.MenuItem>
      </S.Menu>
    </S.More>
  )
}

export default Profile
