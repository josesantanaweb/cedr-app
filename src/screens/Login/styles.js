import styled from 'styled-components/native'

export const Login = styled.ScrollView`
  background: ${props => props.theme.colors.white};
`

export const Cover = styled.Image`
  width: 100%;
  height: 300px;
`
export const Form = styled.View`
  background: ${props => props.theme.colors.white};
  padding: 20px;
`

export const Title = styled.View`
  margin-bottom: 20px;
`

export const Row = styled.View``

export const Forgot = styled.TouchableOpacity`
  align-items: flex-end;
  margin-bottom: 20px;
`

export const Register = styled.View`
  align-items: center;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
`

export const RegisterLink = styled.TouchableOpacity`
  margin-left: 10px;
`

export const RegisterText = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-family: 'OpenSans-SemiBold';
`

export const Footer = styled.View`
  margin-bottom: 20px;
`
