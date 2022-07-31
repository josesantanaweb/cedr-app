import React from 'react'
import Text from '../../../../components/Text'

import * as S from './styles'

const Alert = () => {
  return (
    <S.Alert>
      <S.AlertContent>
        <S.AlertTop>
          <Text align="center" size="medium" color="black">
            ¡Lo Sentimos!
          </Text>
        </S.AlertTop>
        <S.AlertBody>
          <Text align="center" size="medium">
            ¡No tienes permisos para ingresar aqui!
          </Text>
        </S.AlertBody>
      </S.AlertContent>
    </S.Alert>
  )
}

export default Alert
