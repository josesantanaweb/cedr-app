import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width

export const Wrapper = styled.View`
  flex-direction: row;
  margin-right: 40px;
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.colors.white};
`

export const Imagen = styled.Image`
  width: 90px;
  height: 130px;
  border-radius: 10px;
`

export const Title = styled.View`
  width: 200px;
`

export const Description = styled.View`
  margin-left: 20px;
  padding-top: 20px;
`

export const More = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 6%;
  border-style: solid;
  border-color: ${props => props.theme.colors.gray};
  border-width: 1px;
  border-radius: 15px;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
`
