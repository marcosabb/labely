import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Text, Loading } from './styles'

export interface Props extends TouchableOpacityProps {
  kind: 'default' | 'text'
  size: 'small' | 'default'
  loading?: boolean
  children: React.ReactNode
}

export default function Button({
  kind,
  loading = false,
  children,
  ...props
}: Props) {
  return (
    <Container kind={kind} {...props}>
      {loading ? <Loading size='small' /> : <Text kind={kind}>{children}</Text>}
    </Container>
  )
}
