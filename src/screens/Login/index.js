import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {useToast} from 'react-native-toast-notifications'
import {useDispatch} from 'react-redux'

import Text from '../../components/Text'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthService from '../../services/authService'
import * as S from './styles'
import {setAuthenticated} from '../../store/features/AuthSlice'

const Login = ({navigation}) => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      }
      const response = await AuthService.login(data)
      await AsyncStorage.setItem('token', response.token)
      await AsyncStorage.setItem('dataUser', JSON.stringify(response))
      dispatch(setAuthenticated(true))
    } catch (error) {
      toast.show('Credenciales invalidas!', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      console.log(error)
    }
  }

  return (
    <S.Login>
      <S.Cover source={require('../../assets/img/login-bg.png')} />
      <S.Form>
        <S.Title>
          <Text size="normal" color="black">
            Inicia sesión
          </Text>
        </S.Title>
        <S.Row>
          <Input
            onChangeText={s => setEmail(s)}
            label="Email"
            autoCapitalize={'none'}
          />
        </S.Row>
        <S.Row>
          <Input
            secureTextEntry
            onChangeText={s => setPassword(s)}
            label="Contraseña"
          />
        </S.Row>
        <S.Forgot onPress={() => navigation.navigate('RecoverPassword')}>
          <Text size="small" color="gray">
            ¿Has olvidado tu contraseña?
          </Text>
        </S.Forgot>
        <S.Footer>
          <Button label="Iniciar sesión" onPress={handleLogin} />
        </S.Footer>
        <S.Register>
          <Text size="small" color="gray">
            Aun no tienes una cuenta?
          </Text>
          <S.RegisterLink onPress={() => navigation.navigate('Register')}>
            <S.RegisterText>Regístrate</S.RegisterText>
          </S.RegisterLink>
        </S.Register>
      </S.Form>
    </S.Login>
  )
}

export default Login
