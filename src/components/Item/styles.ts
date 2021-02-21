import styled, { css } from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme, ifProp, ifNotProp } from 'styled-tools'

interface LabelsProps {
  spacing?: boolean
}

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
  size: 16,
  color: theme.colors.black
}))``

export const Star = styled.View`
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${theme('colors.alphaYellow')};
  border-radius: 12px;
`

export const StarIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'star',
  size: 16,
  color: theme.colors.yellow
}))``

export const Labels = styled.View<LabelsProps>`
  flex-direction: row;
  flex-wrap: wrap;

  ${ifNotProp(
    'spacing',
    css`
      align-items: baseline;
    `
  )}

  ${ifProp(
    'spacing',
    css`
      margin-bottom: ${theme('spacing.default')};
    `
  )}
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

export const CreateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${theme('colors.blue')};
  border-radius: 8px;
`

export const PenIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'create',
  size: 10,
  color: theme.colors.white
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
