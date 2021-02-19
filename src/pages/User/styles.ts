import styled from 'styled-components/native'
import { theme } from 'styled-tools'

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 0 ${theme('spacing.xlg')} ${theme('spacing.lg')};
  background-color: ${theme('colors.foreground')};
`

export const Header = styled.View`
  align-items: center;
`

export const Form = styled.View``

export const Title = styled.Text`
  margin-bottom: ${theme('spacing.sm')};
  font-family: ${theme('typography.families.bold')};
  font-size: ${theme('typography.sizes.md')};
  color: ${theme('colors.title')};
`

export const Description = styled.Text`
  margin-bottom: ${theme('spacing.md')};
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.text')};
`

export const Field = styled.View`
  margin-bottom: ${theme('spacing.md')};
`

export const Policies = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`

export const PoliciesText = styled.Text`
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.text')};
`
