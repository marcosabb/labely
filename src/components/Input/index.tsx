import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, Field } from './styles'

export interface Props extends TextInputProps {
  name: string
  icon?: string
}

export default function Input({ icon, ...props }: Props) {
  const theme = useContext(ThemeContext)

  return (
    <Container>
      {icon && <Icon name={icon} color={theme.colors.icon} size={24} />}
      <Field autoCapitalize='none' {...props} />
    </Container>
  )
}
