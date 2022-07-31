import styled from 'styled-components/native'

export const Top = styled.View`
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  border-style: solid;
  border-bottom-color: ${props => props.theme.colors.gray};
  border-bottom-width: 1px;
  padding-top: 40px;
`

export const Close = styled.TouchableOpacity`
  margin-bottom: 20px;
  position: absolute;
  top: 0px;
  right: 10px;
`

export const Cover = styled.Image`
  width: 180px;
  height: 270px;
  border-radius: 10px;
  margin-bottom: 20px;
`
