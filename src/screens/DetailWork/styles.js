import styled from 'styled-components/native'

export const Detail = styled.ScrollView`
  background: ${props => props.theme.colors.white};
  padding: 20px;
`

export const Section = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const RatingWrapper = styled.View``

export const Description = styled.View`
  padding-bottom: 20px;
`

export const Rating = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`

export const RatingItem = styled.View`
  margin-right: 10px;
`

export const ViewMore = styled.View`
  border: 1px solid black;
  padding: 5px;
  height: 30px;
  border-radius: 30px;
  width: 30px;
  align-items: center;
`

export const ShopButton = styled.View`
  margin-bottom: 20px;
`
