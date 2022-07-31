import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const width = Dimensions.get('window').width

export const Wrapper = styled.View`
  width: ${width > 500 ? '140px' : '110px'};
  height: ${width > 500 ? '193px' : '150px'};
`

export const Imagen = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`

export const Content = styled.View`
  position: relative;
`

export const Price = styled.View`
  border-style: solid;
  border-color: ${props =>
    props.variant ? props.theme.colors.white : props.theme.colors.primary};
  border-width: 1px;
  border-radius: 15px;
  align-items: center;
  width: 70px;
  margin-top: 10px;
`

export const Get = styled.View`
  border-style: solid;
  border-color: ${props =>
    props.variant ? props.theme.colors.white : props.theme.colors.primary};
  border-width: 1px;
  border-radius: 15px;
  align-items: center;
  width: 70px;
  margin-top: 10px;
`

export const More = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-style: solid;
  border-color: ${props => props.theme.colors.black};
  border-width: 1px;
  border-radius: 15px;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
`
