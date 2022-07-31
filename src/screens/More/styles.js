import styled from 'styled-components/native'

export const More = styled.View`
  background: ${props => props.theme.colors.graylight};
  padding: 20px;
  flex: 1;
`

export const Top = styled.View`
  margin-bottom: 40px;
`

export const Menu = styled.View``

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px 0;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.gray};
  border-bottom-width: 1px;
  justify-content: space-between;
`

export const MenuIcon = styled.View`
  margin-right: 20px;
`
