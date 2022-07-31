import styled from 'styled-components/native'

export const Wrapper = styled.View`
  margin-bottom: ${props => (props.only ? '0px' : '20px')};
  position: relative;
`

export const Input = styled.TextInput`
  font-size: 16px;
  background-color: ${props => props.theme.colors.gray};
  border: 1px solid ${props => props.theme.colors.graylight};
  border-radius: 8px;
  color: ${props => props.theme.colors.black};
  padding-left: ${props => (props.icon ? '40px' : '20px')};
  padding-right: 15px;
  height: 40px;
`

export const Label = styled.Text`
  font-size: 14px;
  font-family: 'OpenSans-SemiBold';
  margin-bottom: 10px;
  color: ${props => props.theme.colors.black};
`
export const Icon = styled.View`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 11px;
  left: 15px;
`
