import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const TopSales = styled.View`
  background: ${props => props.theme.colors.graylight};
  height: ${width > 500 ? '290px' : '250px'};
  padding: 20px;
`

export const Top = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.graydark};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`

export const Item = styled.TouchableOpacity`
  margin-right: 20px;
`

export const Empty = styled.View`
  margin-top: 10px;
`

export const Explore = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
`
