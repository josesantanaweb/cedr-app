import styled from 'styled-components/native'

export const Select = styled.View`
  position: relative;
  color: ${props => props.theme.colors.black};
  margin-bottom: 20px;
`

export const Label = styled.View`
  margin-bottom: 10px;
`

export const Toggle = styled.TouchableOpacity`
  border-radius: 8px;
  position: relative;
  flex-direction: row;
  padding: 0 10px;
  background-color: ${props => props.theme.colors.gray};
  border: 1px solid ${props => props.theme.colors.graylight};
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 45px;
`

export const Options = styled.View`
  border-radius: 5px;
  width: 100%;
  max-height: 200px;
`

export const Option = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.gray};
  width: 100%;
  padding: 10px;
`
