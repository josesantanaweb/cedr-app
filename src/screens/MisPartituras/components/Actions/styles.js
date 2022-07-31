import styled from 'styled-components/native'
import {Dimensions} from 'react-native'

const windowWidth = Dimensions.get('window').width

export const Modal = styled.View`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${windowWidth}px;
  z-index: 10;
`

export const Actions = styled.View`
  background: white;
  padding: 20px 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 80%;
  width: ${windowWidth}px;
  z-index: 11;
`

export const List = styled.View``

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.gray};
  border-bottom-width: 1px;
  padding: 15px 0;
`
