import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const Particoteca = styled.ScrollView`
  background: ${props => props.theme.colors.graylight};
  flex: 1;
`

export const Top = styled.View`
  margin-bottom: 40px;
  padding: 20px;
  background: ${props => props.theme.colors.white};
`

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Item = styled.TouchableOpacity`
  width: ${width > 500 ? '20%' : '33%'};
  height: ${width > 500 ? '240px' : '170px'};
  align-items: center;
  padding: 10px;
  position: relative;
`

export const Works = styled.View`
  padding: 20px;
`
