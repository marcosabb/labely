import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Text, Loading } from './styles'

export interface Props extends TouchableOpacityProps {
  children: React.ReactNode
  size: 'small' | 'default'
  loading?: boolean
}

export default function Button({ children, loading = false, ...props }: Props) {
  return (
    <Container {...props}>
      {loading ? <Loading size='small' /> : <Text>{children}</Text>}
    </Container>
  )
}
