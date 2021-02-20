import styled from 'styled-components/native'
import { theme } from 'styled-tools'
import { FlatList } from 'react-native'

import { Repository } from '../../contexts/repositories'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme('colors.background')};
`

export const List = styled(FlatList as new () => FlatList<Repository>).attrs({
  contentContainerStyle: {
    paddingTop: 8,
    paddingHorizontal: 16
  }
})``
