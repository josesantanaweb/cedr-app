import styled from 'styled-components/native'

export const Authors = styled.View`
  background: ${props => props.theme.colors.graylight};
  padding: 20px;
  height: 270px;
`

export const AuthorsTop = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.graydark};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`

export const AuthorsItem = styled.TouchableOpacity`
  margin-right: 20px;
`
