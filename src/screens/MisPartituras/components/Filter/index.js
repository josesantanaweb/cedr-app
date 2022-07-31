import React, {useState, useContext} from 'react'
import {ThemeContext} from 'styled-components'
import Text from '../../../../components/Text'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as S from './styles'

const Filter = ({
  setFilter,
  filter,
  handleSquare,
  handleList,
  handleCollection,
  handleRecient,
  handleTitle,
  handleAuthor,
}) => {
  const {colors} = useContext(ThemeContext)
  return (
    <S.Filter>
      <S.FilterToggle onPress={setFilter}>
        <S.FilterTitle>
          <Text size="small" color="black">
            Clasificar
          </Text>
        </S.FilterTitle>
        <Icon name="sort-amount-asc" size={14} color={colors.grayDark} />
      </S.FilterToggle>
      {filter && (
        <S.FilterItems>
          <S.FilterView>
            <S.FilterLabel>
              <Text size="small" color="black">
                Ver
              </Text>
            </S.FilterLabel>
            <S.FilterItem onPress={handleCollection}>
              <S.FilterIcon>
                <Icon name="th" size={14} color={colors.grayDark} />
              </S.FilterIcon>
              <Text size="small" color="black">
                Colección
              </Text>
            </S.FilterItem>
            <S.FilterItem onPress={handleSquare}>
              <S.FilterIcon>
                <Icon name="th" size={14} color={colors.grayDark} />
              </S.FilterIcon>
              <Text size="small" color="black">
                Cuadricula
              </Text>
            </S.FilterItem>
            <S.FilterItem onPress={handleList}>
              <S.FilterIcon>
                <Icon name="th-list" size={14} color={colors.grayDark} />
              </S.FilterIcon>
              <Text size="small" color="black">
                Lista
              </Text>
            </S.FilterItem>
          </S.FilterView>
          <S.FilterOrder>
            <S.FilterLabel>
              <Text size="small" color="black">
                Ordenar
              </Text>
            </S.FilterLabel>
            <S.FilterItem onPress={handleRecient}>
              <Text size="small" color="black">
                Reciente
              </Text>
            </S.FilterItem>
            <S.FilterItem onPress={handleTitle}>
              <Text size="small" color="black">
                Titulo
              </Text>
            </S.FilterItem>
            <S.FilterItem onPress={handleAuthor}>
              <Text size="small" color="black">
                Autor
              </Text>
            </S.FilterItem>
          </S.FilterOrder>
        </S.FilterItems>
      )}
    </S.Filter>
  )
}

export default Filter
