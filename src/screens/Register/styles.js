import styled from 'styled-components/native'

export const Register = styled.ScrollView`
  background: ${props => props.theme.colors.white};
  padding: 20px 20px;
`
export const Top = styled.View`
  margin-bottom: 40px;
  position: relative;
  padding-top: 30px;
`
export const Close = styled.TouchableOpacity`
  margin-bottom: 20px;
  position: absolute;
  top: 0px;
  right: 10px;
`

export const Upload = styled.View`
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-bottom: 30px;
`

export const Default = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background: ${props => props.theme.colors.gray};
  align-items: center;
  justify-content: center;
`
export const Row = styled.View``

export const Footer = styled.View`
  margin-top: 50px;
  margin-bottom: 50px;
`
