import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const Detail = styled.ScrollView`
  background: ${props => props.theme.colors.graylight};
`

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Description = styled.View``

export const Cover = styled.Image`
  width: 90px;
  height: 120px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const Top = styled.View`
  margin-bottom: 30px;
  padding: 10px 20px;
  background: ${props => props.theme.colors.white};
`

export const TopSearch = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding: 20px 0;
`

export const Item = styled.TouchableOpacity`
  width: ${width > 500 ? '20%' : '33%'};
  height: ${width > 500 ? '240px' : '170px'};
  align-items: center;
`

export const Country = styled.View`
  border-radius: 10px;
  width: 80px;
  margin-top: 5px;
  background: ${props => props.theme.colors.primary};
  align-items: center;
`
