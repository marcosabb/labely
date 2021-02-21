import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from 'styled-tools'

export const Container = styled.View`
  padding-left: ${theme('spacing.default')};
  padding-right: ${theme('spacing.default')};
`

export const Fields = styled.View`
  flex-direction: row;
  margin-bottom: ${theme('spacing.default')};
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
