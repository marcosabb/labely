import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from 'styled-tools'

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${theme('spacing.default')};
  background-color: ${theme('colors.modal')};
`

export const Wrapper = styled.View`
  flex: 1;
  padding: ${theme('spacing.lg')} ${theme('spacing.md')};
  background-color: ${theme('colors.foreground')};
  border-radius: ${theme('radius.default')};
`

export const Title = styled.Text`
  margin-bottom: ${theme('spacing.default')};
  font-family: ${theme('typography.families.bold')};
  font-size: ${theme('typography.sizes.md')};
  color: ${theme('colors.black')};
`

export const Field = styled.View`
  margin-bottom: ${theme('spacing.xs')};
`

export const Suggestions = styled.View`
  margin-bottom: ${theme('spacing.md')};
  padding: ${theme('spacing.default')} ${theme('spacing.sm')};
  background-color: ${theme('colors.foreground')};
  border-radius: ${theme('radius.default')};
  elevation: 6;
`

export const SuggestionsText = styled.Text`
  margin-bottom: ${theme('spacing.md')};
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.text')};
`

export const Labels = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const LabelItem = styled.View`
  flex-direction: row;
  align-items: center;
  height: 26px;
  margin-bottom: ${theme('spacing.default')};
  margin-right: ${theme('spacing.default')};
  padding-left: ${theme('spacing.default')};
  padding-right: ${theme('spacing.default')};
  background-color: ${theme('colors.alphaBlack')};
  border-radius: 100px;
`

export const LabelText = styled.Text`
  margin-right: ${theme('spacing.xs')};
  font-family: ${theme('typography.families.regular')};
  font-size: ${theme('typography.sizes.default')};
  color: ${theme('colors.black')};
`

export const CreateButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${theme('colors.white')};
  border-radius: 8px;
`

export const PlusIcon = styled(Icon)`
  font-size: 10px;
  color: ${theme('colors.black')};
`

export const DeleteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${theme('colors.black')};
  border-radius: 8px;
`

export const CloseIcon = styled(Icon)`
  font-size: 10px;
  color: ${theme('colors.white')};
`

export const Buttons = styled.View``
