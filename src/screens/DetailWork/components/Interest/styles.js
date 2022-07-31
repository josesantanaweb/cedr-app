import styled from 'styled-components/native'

export const Interest = styled.View`
  background: ${props => props.theme.colors.white};
  padding: 20px;
  height: 390px;
`

export const InterestTop = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`

export const InterestItem = styled.View`
  margin-right: 20px;
`
