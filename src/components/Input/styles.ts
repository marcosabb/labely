import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from 'styled-tools'

import { Props } from '../Input'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
  padding-left: ${theme('spacing.default')};
  padding-right: ${theme('spacing.default')};
  background-color: ${theme('colors.foreground')};
  border: ${theme('borders.default')};
  border-radius: ${theme('radius.sm')};
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

export const FieldIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.icon,
  size: 24
}))``
