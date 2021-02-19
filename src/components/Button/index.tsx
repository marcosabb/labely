import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Text } from './styles'

export interface Props extends TouchableOpacityProps {
  children: React.ReactNode
}

export default function Button({ children, ...props }: Props) {
  return (
    <Container activeOpacity={0.8} {...props}>
      <Text>{children}</Text>
    </Container>
  )
}
