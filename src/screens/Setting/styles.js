import styled from 'styled-components/native'

export const Setting = styled.View`
  background: ${props => props.theme.colors.graylight};
  padding: 20px;
  flex: 1;
`

export const Back = styled.TouchableOpacity`
  position: relative;
  margin-bottom: 20px;
  flex-direction: row;
  width: 60px;
  justify-content: space-between;
  align-items: center;
`

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
