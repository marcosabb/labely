import styled, { css } from 'styled-components/native'
import { theme, ifProp } from 'styled-tools'

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${theme('colors.black')};
  border-radius: 100px;

  ${ifProp(
    'disabled',
    css`
      opacity: 0.8;
    `
  )}
`

export const Text = styled.Text`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.foreground')};
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.foreground
}))``
