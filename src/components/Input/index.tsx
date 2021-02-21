import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, Wrapper, Field, FieldIcon } from './styles'

export interface Props extends TextInputProps {
  name: string
  icon?: string
  color?: 'primary' | 'secondary'
  expanded?: boolean
  direction?: 'left' | 'right'
  onExpand?: () => void
}

export default function Input({
  icon,
  color,
  expanded = true,
  direction,
  onExpand = () => {},
  ...props
}: Props) {
  return (
    <Container onPress={onExpand}>
      <Wrapper expanded={expanded} direction={direction}>
        {icon && <FieldIcon name={icon} color={color} />}
        <Field autoCapitalize='none' {...props} />
      </Wrapper>
    </Container>
  )
}
