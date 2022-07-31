import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const MisPartituras = styled.SafeAreaView`
  background: ${props => props.theme.colors.graylight};
  flex: 1;
`
export const Search = styled.View`
  margin-bottom: 0px;
`

export const Top = styled.View`
  margin-bottom: 20px;
`

export const TopSearch = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: 10px 20px;
`

export const Title = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Quantity = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Collections = styled.View`
  margin-bottom: 20px;
`
export const Recent = styled.View`
  margin-bottom: 30px;
`

export const ChangeList = styled.TouchableOpacity``

export const Item = styled.TouchableOpacity`
  width: ${width > 500 ? '20%' : '33%'};
  height: ${width > 500 ? '240px' : '170px'};
  align-items: center;
`

export const ItemList = styled.TouchableOpacity`
  padding-bottom: 10px;
  margin: 0 10px;
`
