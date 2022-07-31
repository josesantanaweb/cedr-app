import styled from 'styled-components/native'

export const Wrapper = styled.View`
  width: 120px;
  height: 140px;
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
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 15px;
  align-items: center;
  width: 70px;
  margin-top: 10px;
`

export const Get = styled.View`
  border-style: solid;
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 15px;
  align-items: center;
  width: 70px;
  margin-top: 10px;
`

export const More = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 10px;
  border-style: solid;
  border-color: ${props => props.theme.colors.gray};
  border-width: 1px;
  border-radius: 15px;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
`
