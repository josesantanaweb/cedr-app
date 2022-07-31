import styled from 'styled-components/native'

export const Modal = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  align-items: center;
  justify-content: center;
`

export const Options = styled.View`
  width: 60%;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
`

export const Option = styled.TouchableOpacity`
  padding: 15px 0;
`

export const Form = styled.View`
  padding: 15px;
  width: 80%;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
`

export const Footer = styled.View``

export const Close = styled.TouchableOpacity`
  padding: 10px 0;
  border-top-style: solid;
  border-top-color: ${props => props.theme.colors.graydark};
  border-top-width: 1px;
`
