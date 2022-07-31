import React, {useState} from 'react'

import Icon from 'react-native-vector-icons/Feather'
import Text from '../../components/Text'
import Input from '../../components/Input'
import Button from '../../components/Button'

import * as S from './styles'

function RecoverPassowrd({navigation}) {
  const [email, setEmail] = useState('')

  return (
    <S.RecoverPassword>
      <S.Top>
        <Text size="large" color="black" family="primary">
          Recurperar contraseña
        </Text>
        <S.Close onPress={() => navigation.navigate('Login')}>
          <Icon name="x" size={24} color="black" />
        </S.Close>
      </S.Top>
      <S.Description>
        <Text size="small" color="gray">
          Te llegará un correo a tu bandeja de entrada con una nueva contraseña.
        </Text>
      </S.Description>
      <S.Row>
        <Input onChangeText={s => setEmail(s)} label="Email" />
      </S.Row>
      <S.Footer>
        <Button label="Enviar" onPress={() => console.log('hello')} />
      </S.Footer>
    </S.RecoverPassword>
  )
}

export default RecoverPassowrd
