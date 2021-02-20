import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, Field, FieldIcon } from './styles'

export interface Props extends TextInputProps {
  name: string
  icon?: string
}

export default function Input({ icon, ...props }: Props) {
  return (
    <Container>
      {icon && <FieldIcon name={icon} />}
      <Field autoCapitalize='none' {...props} />
    </Container>
  )
}
