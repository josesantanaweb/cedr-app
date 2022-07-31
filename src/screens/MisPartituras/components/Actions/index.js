import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

import {View} from 'react-native'
import Text from '../../../../components/Text'
import Top from '../Top'

import * as S from './styles'

const Actions = ({setActions}) => {
  return (
    <S.Modal>
      <S.Actions>
        <S.List>
          <Top setActions={setActions} />
          <S.Item>
            <Text size="medium" color="black">
              Copiar
            </Text>
            <Icon name="copy" size={24} color="gray" />
          </S.Item>
          <S.Item>
            <Text size="medium" color="black">
              Compartir libro
            </Text>
            <Icon name="upload" size={24} color="gray" />
          </S.Item>
          <S.Item>
            <Text size="medium" color="black">
              Añadir a colección
            </Text>
            <Icon name="book" size={24} color="gray" />
          </S.Item>
          <S.Item>
            <Text size="medium" color="black">
              Ver en tienda
            </Text>
            <Icon name="shopping-bag" size={24} color="gray" />
          </S.Item>
          <S.Item>
            <Text size="medium" color="black">
              Eliminar
            </Text>
            <Icon name="trash-o" size={24} color="gray" />
          </S.Item>
          <S.Item>
            <Text size="medium" color="black">
              Valorar y escribir reseña
            </Text>
            <Icon name="star-o" size={24} color="gray" />
          </S.Item>
          <S.Item>
            <Text size="medium" color="black">
              Sugerir similares
            </Text>
            <Icon name="thumbs-o-up" size={24} color="gray" />
          </S.Item>
        </S.List>
      </S.Actions>
    </S.Modal>
  )
}

export default Actions
