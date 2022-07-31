import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const getHeight = () => {
  return Dimensions.get('window').height
}

export const Alert = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${getHeight()};
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  align-items: center;
  justify-content: center;
`

export const AlertContent = styled.View`
  width: 80%;
  border-radius: 10px;
  padding: 20px 20px;
  height: 150px;
  background-color: ${props => props.theme.colors.white};
`

export const AlertTop = styled.View`
  margin-bottom: 20px;
`

export const AlertBody = styled.View`
  align-items: center;
  justify-content: center;
`
