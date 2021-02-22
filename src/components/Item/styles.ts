import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from 'styled-tools'

export const Container = styled.TouchableOpacity`
  margin-bottom: ${theme('spacing.xs')};
  padding: ${theme('spacing.lg')} ${theme('spacing.md')};
  background-color: ${theme('colors.foreground')};
  border-radius: ${theme('radius.default')};
`

export const Details = styled.View`
  flex-direction: row;
  margin-bottom: ${theme('spacing.default')};
`

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  margin-right: ${theme('spacing.default')};
  border-radius: 32px;
`

export const Data = styled.View`
  flex: 1;
  justify-content: center;
`

export const Title = styled.View`
  flex-direction: row;
`

export const TitleText = styled.Text`
  max-width: 50%;
  margin-right: ${theme('spacing.sm')};
  margin-bottom: ${theme('spacing.sm')};
  font-family: ${theme('typography.families.bold')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.black')};
`

export const Description = styled.Text`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.sm')};
  color: ${theme('colors.black')};
`

export const ArrowIcon = styled(Icon)`
  flex: 1;
  font-size: 24px;
  color: ${theme('colors.black')};
`

export const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${theme('colors.mediumgray')};
  border-radius: 12px;
`

export const TrashIcon = styled(Icon)`
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.black')};
`

export const Star = styled.View`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${theme('colors.alphaYellow')};
  border-radius: 12px;
`

export const StarIcon = styled(Icon)`
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.yellow')};
`

export const Labels = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${theme('spacing.default')};
`

export const LabelItem = styled.View`
  flex-direction: row;
  align-items: center;
  height: 22px;
  margin-bottom: ${theme('spacing.default')};
  margin-right: ${theme('spacing.default')};
  padding-left: ${theme('spacing.default')};
  padding-right: ${theme('spacing.default')};
  background-color: ${theme('colors.alphaBlack')};
  border-radius: 100px;
`

export const LabelText = styled.Text`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.xs')};
  color: ${theme('colors.black')};
`

export const UpdateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  background-color: ${theme('colors.blue')};
  border-radius: 8px;
`

export const PenIcon = styled(Icon)`
  font-size: 10px;
  color: ${theme('colors.white')};
`

export const Tags = styled.View`
  flex-direction: row;
`

export const TagItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: ${theme('spacing.default')};
`

export const TagText = styled.Text`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.xs')};
  color: ${theme('colors.text')};
`

export const TagIcon = styled(Icon)`
  margin-right: ${theme('spacing.xxs')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.gray')};
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.black
}))``
