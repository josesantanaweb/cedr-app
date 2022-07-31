import React, {useContext} from 'react'
import {ThemeContext} from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'

import PropTypes from 'prop-types'
import Text from '../Text'

import * as S from './styles'

const Author = ({imagen, name, author, viewMore, handleAction}) => {
  const {colors} = useContext(ThemeContext)
  return (
    <S.Wrapper>
      <S.Imagen source={{uri: imagen}} />
      <S.Content>
        <Text size="normal" color="black" numberOfLines={1}>
          {name}
        </Text>
        {viewMore && (
          <S.More onPress={handleAction}>
            <Icon name="ellipsis-h" size={14} color={colors.grayDark} />
          </S.More>
        )}
      </S.Content>
    </S.Wrapper>
  )
}

Author.propTypes = {
  imagen: PropTypes.string,
  name: PropTypes.string,
  viewMore: PropTypes.bool,
}

Author.defaultProps = {
  viewMore: false,
}

export default Author
