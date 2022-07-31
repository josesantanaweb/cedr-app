import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import {ThemeContext} from 'styled-components'

import * as S from './styles'

const Input = ({
  label,
  value,
  placeholder,
  only,
  onChangeText,
  secureTextEntry,
  keyboardType,
  onBlur,
  onFocus,
  icon,
  ...props
}) => {
  const {colors} = useContext(ThemeContext)

  return (
    <S.Wrapper only={only}>
      {label && <S.Label>{label}</S.Label>}

      <S.Input
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        numberOfLines={1}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={colors.grayDark}
        icon={icon}
        {...props}
      />

      {icon && (
        <S.Icon>
          <Icon name="search" size={16} />
        </S.Icon>
      )}
    </S.Wrapper>
  )
}

Input.propTypes = {
  icon: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  only: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
}

Input.defaultProps = {
  icon: false,
  secureTextEntry: false,
  only: false,
}

export default Input
