import React, {useState} from 'react'
import {useToast} from 'react-native-toast-notifications'

import Icon from 'react-native-vector-icons/Feather'
import Text from '../../components/Text'
import Input from '../../components/Input'
import Button from '../../components/Button'
import AuthService from '../../services/authService'
import * as S from './styles'

const Register = ({navigation}) => {
  const toast = useToast()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      let data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        roles: ['62726ab62883239288c0c908'],
      }
      await AuthService.register(data)
      toast.show('Registro completado exitosamente!', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      navigation.navigate('Login')
    } catch (error) {
      toast.show('Upps ocurrio un error al crear usuario!', {
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
    <S.Register>
      <S.Top>
        <Text size="large" color="black" family="primary">
          Registro
        </Text>
        <S.Close onPress={() => navigation.navigate('Login')}>
          <Icon name="x" size={24} color="black" />
        </S.Close>
      </S.Top>
      <S.Row>
        <Input onChangeText={s => setName(s)} label="Nombre" />
      </S.Row>
      <S.Row>
        <Input onChangeText={s => setSurname(s)} label="Apellidos" />
      </S.Row>
      <S.Row>
        <Input onChangeText={s => setEmail(s)} label="Email" />
      </S.Row>

      <S.Row>
        <Input onChangeText={s => setPassword(s)} label="Contraseña" />
      </S.Row>
      <S.Footer>
        <Button label="Registrarse" onPress={handleSubmit} />
      </S.Footer>
    </S.Register>
  )
}

export default Register
