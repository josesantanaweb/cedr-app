import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const Folders = styled.View`
z-index: -10;
`

export const List = styled.View`
  max-height: 450px;
`

export const AddCollection = styled.TouchableOpacity`
  margin-bottom: 15px;
  margin-left: 10px;
  padding: 10px 10px;
  width: 170px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
`

export const AddCollectionLabel = styled.View`
  margin-left: 10px;
`

export const Item = styled.TouchableOpacity`
  width: ${width > 500 ? '20%' : '29%'};
  height: ${width > 500 ? '240px' : '170px'};
  background: ${props => props.theme.colors.white};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 10px 2%;
`
