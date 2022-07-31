import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import PropTypes from 'prop-types'

import * as S from './styles'

const Work = ({imagen, onPress}) => {
  return (
    <S.Wrapper>
      <S.Imagen source={{uri: imagen}} />
      <S.More onPress={onPress}>
        <Icon name="more-horizontal" size={14} color="black" />
      </S.More>
    </S.Wrapper>
  )
}

Work.propTypes = {
  imagen: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

export default Work
