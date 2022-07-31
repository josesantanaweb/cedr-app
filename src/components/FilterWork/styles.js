import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const FilterWork = styled.View`
  background: ${props => props.theme.colors.graylight};
  flex: 1;
`

export const Item = styled.TouchableOpacity`
  width: ${width > 500 ? '20%' : '33%'};
  height: ${width > 500 ? '240px' : '170px'};
  align-items: center;
`
