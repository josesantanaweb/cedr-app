import styled from 'styled-components/native'

export const Filter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 10;
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.white};
`

export const FilterToggle = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

export const FilterTitle = styled.View`
  margin-right: 10px;
`

export const FilterItems = styled.View`
  position: absolute;
  top: 39px;
  right: 20px;
  width: 200px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  border: 1px solid ${props => props.theme.colors.gray};
`

export const FilterView = styled.View`
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.gray};
  border-bottom-width: 1px;
`

export const FilterOrder = styled.View``

export const FilterLabel = styled.View`
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.gray};
  border-bottom-width: 1px;
  padding: 10px 10px;
`

export const FilterItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
`

export const FilterIcon = styled.View`
  margin-right: 10px;
`
