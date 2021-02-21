import styled, { css } from 'styled-components/native'
import { theme, ifProp, switchProp } from 'styled-tools'

import { Props } from '../Button'

export const Container = styled.TouchableOpacity<Props>`
  justify-content: center;
  align-items: center;
  padding-left: ${theme('spacing.md')};
  padding-right: ${theme('spacing.md')};
  border-radius: 100px;

  ${ifProp(
    'disabled',
    css`
      opacity: 0.8;
    `
  )}

  ${switchProp('kind', {
    default: css`
      background-color: ${theme('colors.black')};
    `,

    text: css`
      background-color: transparent;
    `
  })}

  ${switchProp('size', {
    default: css`
      height: 40px;
    `,

    small: css`
      height: 32px;
    `
  })}
`

export const Text = styled.Text<Pick<Props, 'kind'>>`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};

  ${switchProp('kind', {
    default: css`
      color: ${theme('colors.foreground')};
    `,

    text: css`
      color: ${theme('colors.black')};
    `
  })}
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.foreground
}))``
