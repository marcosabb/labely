import styled, { css } from 'styled-components/native'
import { theme, ifProp, switchProp } from 'styled-tools'

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-left: ${theme('spacing.md')};
  padding-right: ${theme('spacing.md')};
  background-color: ${theme('colors.black')};
  border-radius: 100px;

  ${ifProp(
    'disabled',
    css`
      opacity: 0.8;
    `
  )}

  ${switchProp('size', {
    small: css`
      height: 32px;
    `,

    default: css`
      height: 40px;
    `
  })}
`

export const Text = styled.Text`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.foreground')};
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.foreground
}))``
