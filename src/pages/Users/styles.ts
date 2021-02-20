import styled from 'styled-components/native'
import { theme } from 'styled-tools'

import { FlatList } from 'react-native'
import { User } from '../../contexts/users'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme('colors.background')};
`

export const List = styled(FlatList as new () => FlatList<User>).attrs({
  contentContainerStyle: {
    paddingTop: 8,
    paddingHorizontal: 16
  }
})``
