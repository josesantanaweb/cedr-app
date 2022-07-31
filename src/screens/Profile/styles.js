import styled from 'styled-components/native'

export const Profile = styled.ScrollView`
  background: ${props => props.theme.colors.graylight};
  padding: 20px 20px;
`

export const Back = styled.TouchableOpacity`
  position: relative;
  margin-bottom: 40px;
  flex-direction: row;
  width: 60px;
  justify-content: space-between;
  align-items: center;
`

export const Upload = styled.View`
  position: relative;
  margin-bottom: 20px;
  align-items: center;
  width: 80px;
  margin: 20px auto;
`

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
`

export const IconAvatar = styled.View`
  position: absolute;
  background: ${props => props.theme.colors.primary};
  padding: 8px;
  border-radius: 30px;
  bottom: -5px;
  right: 0;
`

export const Row = styled.View``

export const Footer = styled.View`
  margin-bottom: 50px;
`
