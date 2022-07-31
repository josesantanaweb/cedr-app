import styled from 'styled-components/native'

export const Wrapper = styled.TouchableOpacity`
  background: ${props =>
    props.variant === 'primary'
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  height: 50px;
  border-radius: 8px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  align-items: center;
  flex-direction: row;
  justify-content: center;
`

export const Collection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`

export const CollectionLeft = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Label = styled.Text`
  color: ${props =>
    props.color === 'white'
      ? props.theme.colors.primary
      : props.theme.colors.white};
  font-family: 'OpenSans-SemiBold';
  font-size: 16px;
`
