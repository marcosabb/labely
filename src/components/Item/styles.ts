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
  width: 50%;
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

export const ArrowIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'keyboard-arrow-right',
  size: 24,
  color: theme.colors.black
}))`
  flex: 1;
`

export const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${theme('colors.iconBackground')};
  border-radius: 12px;
`

export const TrashIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'delete',
  size: 18,
  color: theme.colors.black
}))``

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

export const TagIcon = styled(Icon).attrs(({ theme }) => ({
  size: 16,
  color: theme.colors.icon
}))`
  margin-right: ${theme('spacing.xxs')};
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.black
}))``
