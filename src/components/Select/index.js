import React, {useContext, useEffect} from 'react'
import {FlatList, LogBox} from 'react-native'
import {ThemeContext} from 'styled-components'

import Text from '../../components/Text'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as S from './styles'

const Select = ({hanleOpen, option, open, hanleSelected, data, label}) => {
  const {colors} = useContext(ThemeContext)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  const renderItem = ({item}) => {
    return (
      <S.Option onPress={() => hanleSelected(item)} activeOpacity={1}>
        <Text color="black" size="small">
          {item.label}
        </Text>
      </S.Option>
    )
  }

  return (
    <S.Select>
      {label && (
        <S.Label>
          <Text color="black" size="small">
            {label}
          </Text>
        </S.Label>
      )}
      <S.Toggle onPress={hanleOpen} activeOpacity={1}>
        <Text color="black" size="small">
          {option.label}
        </Text>
        <Icon name="angle-down" size={24} color={colors.black} />
      </S.Toggle>
      {open && (
        <S.Options>
          <FlatList
            data={data}
            scrollEnabled
            keyExtractor={item => item.value}
            renderItem={renderItem}
          />
        </S.Options>
      )}
    </S.Select>
  )
}

export default Select
