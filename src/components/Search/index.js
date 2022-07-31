import React, {useContext} from 'react'
import {ThemeContext} from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'
import Input from '../../components/Input'
import * as S from './styles'

const Search = ({onChangeText, navigation, back}) => {
  const {colors} = useContext(ThemeContext)
  return (
    <S.Search>
      {back && (
        <S.SearchIcon onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={24} color={colors.primary} />
        </S.SearchIcon>
      )}
      <S.SearchInput back={back}>
        <Input onChangeText={onChangeText} placeholder="Buscar" icon only />
      </S.SearchInput>
    </S.Search>
  )
}

export default Search
