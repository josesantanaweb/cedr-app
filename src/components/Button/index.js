import React from 'react'
import {View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

import * as S from './styles'

const Button = ({
  label,
  variant,
  disabled,
  collection,
  onPress,
  icon,
  ...props
}) => {
  return (
    <S.Wrapper
      onPress={onPress}
      variant={variant}
      disabled={disabled}
      {...props}>
      {collection ? (
        <S.Collection>
          <S.CollectionLeft>
            <View style={{marginRight: 10}}>
              <Icon name="heart" size={18} color="white" />
            </View>
            <S.Label variant={variant}>{label}</S.Label>
          </S.CollectionLeft>
          <View style={{marginRight: 10}}>
            <Icon name="angle-right" size={24} color="white" />
          </View>
        </S.Collection>
      ) : (
        <S.Label variant={variant}>{label}</S.Label>
      )}
    </S.Wrapper>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  collection: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

Button.defaultProps = {
  variant: 'primary',
  disabled: false,
  collection: false,
}

export default Button
