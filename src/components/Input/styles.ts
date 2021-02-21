import styled, { css } from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme, switchProp, ifProp, ifNotProp } from 'styled-tools'

import { Props } from '../Input'

export const Container = styled.TouchableWithoutFeedback``

export const Wrapper = styled.View<Pick<Props, 'expanded' | 'direction'>>`
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding-left: ${theme('spacing.default')};
  padding-right: ${theme('spacing.default')};
  background-color: ${theme('colors.foreground')};
  border: ${theme('borders.default')};
  border-radius: ${theme('radius.sm')};

  ${ifProp(
    'expanded',
    css`
      flex-grow: 1;
    `
  )}

  ${ifNotProp(
    'expanded',
    css`
      padding: ${theme('spacing.sm')};
      width: 48px;
    `
  )}

  ${switchProp('direction', {
    left: css`
      margin-left: ${theme('spacing.xs')};
    `,

    right: css`
      margin-right: ${theme('spacing.xs')};
    `
  })}
`

export const Field = styled.TextInput.attrs<Props>(({ theme }) => ({
  placeholderTextColor: theme.colors.text
}))<Props>`
  flex: 1;
  height: 40px;
  margin-left: ${theme('spacing.xs')};
  padding: 0;
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.black')};
`

export const FieldIcon = styled(Icon)`
  font-size: 24px;

  ${switchProp('color', {
    primary: css`
      color: ${theme('colors.text')};
    `,

    secondary: css`
      color: ${theme('colors.gray')};
    `
  })}
`
