import React, {useContext} from 'react'
import {ThemeContext} from 'styled-components'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import Text from '../Text'

import * as S from './styles'

const WorkHorizontal = ({imagen, title, author, instrumentation, onPress}) => {
  const {colors} = useContext(ThemeContext)
  return (
    <S.Wrapper>
      <S.Imagen source={{uri: imagen}} />
      <S.Description>
        <S.Title>
          <Text size="normal" color="black" numberOfLines={1}>
            {title}
          </Text>
        </S.Title>

        <Text size="small" color="whitesmoke">
          {author}
        </Text>
        <Text size="small" color="primary">
          {instrumentation}
        </Text>
      </S.Description>
      <S.More onPress={onPress}>
        <Icon name="ellipsis-h" size={14} color={colors.grayDark} />
      </S.More>
    </S.Wrapper>
  )
}

WorkHorizontal.propTypes = {
  imagen: PropTypes.string,
  title: PropTypes.string,
}

export default WorkHorizontal
