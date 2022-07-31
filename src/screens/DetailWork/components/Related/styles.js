import styled from 'styled-components/native'

export const Related = styled.View`
  background: ${props => props.theme.colors.white};
  padding: 20px;
  height: 390px;
`

export const RelatedTop = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`

export const RelatedItem = styled.View`
  margin-right: 20px;
`
