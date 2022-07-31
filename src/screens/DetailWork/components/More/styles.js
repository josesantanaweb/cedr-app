import styled from 'styled-components/native'

export const More = styled.View`
  background: ${props => props.theme.colors.white};
  padding: 20px;
  height: 390px;
`

export const MoreTop = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
`

export const MoreItem = styled.View`
  margin-right: 20px;
`
