import styled from 'styled-components/native'

export const Text = styled.Text`
  text-align: ${props => (props.align === 'center' ? 'center' : 'left')};
  font-family: ${props =>
    props.family === 'primary'
      ? 'DMSerifDisplay-Regular'
      : 'OpenSans-SemiBold'};'';
  color: ${props =>
    props.color === 'black'
      ? props.theme.colors.black
      : props.color === 'white'
      ? props.theme.colors.white
      : props.color === 'primary'
      ? props.theme.colors.primary
      : props.theme.colors.graydark};
  /* text-transform: ${props =>
    props.uppercase === 'uppercase' ? 'uppercase' : 'capitalize'}; */
    font-size: ${({size}) =>
      size === 'small'
        ? '14px'
        : size === 'normal'
        ? '16px'
        : size === 'medium'
        ? '18px'
        : size === 'large'
        ? '24px'
        : size === 'xlarge'
        ? '36px'
        : '12px'};
`
