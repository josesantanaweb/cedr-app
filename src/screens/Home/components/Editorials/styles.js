import styled from 'styled-components/native'

export const Editorials = styled.View`
  background: ${props => props.theme.colors.graylight};
  padding: 20px;
  height: 240px;
`

export const EditorialsTop = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.graydark};
  border-bottom-width: 1px;
  padding-bottom: 10px;
`

export const EditorialsItem = styled.TouchableOpacity`
  width: 240px;
  margin-right: 10px;
  height: 140px;
  border-radius: 15px;
  background: ${props => props.theme.colors.graydark};
  align-items: center;
  justify-content: center;
`
