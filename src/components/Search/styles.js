import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const Search = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const SearchIcon = styled.TouchableOpacity``

export const SearchInput = styled.View`
  width: ${props =>
    !props.back && width > 500
      ? '100%'
      : !props.back && width < 500
      ? '100%'
      : props.back && width < 500
      ? '95%'
      : '95%'};
`
