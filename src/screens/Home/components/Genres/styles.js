import styled from 'styled-components/native'

export const Genres = styled.View`
  background: ${props => props.theme.colors.graylight};
  padding: 20px;
  height: 240px;
`

export const GenresTop = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.graydark};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`

export const GenresItem = styled.TouchableOpacity`
  margin-right: 20px;
  width: 240px;
  height: 140px;
  background: #a82343;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`
