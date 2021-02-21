import styled from 'styled-components/native'
import { theme } from 'styled-tools'
import { FlatList } from 'react-native'

import { Repository } from '../../contexts/repositories'

export const Container = styled.View`
  flex: 1;
  padding-top: ${theme('spacing.xs')};
  background-color: ${theme('colors.background')};
`

export const HeaderRight = styled.View`
  margin-right: ${theme('spacing.default')};
`

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const List = styled(FlatList as new () => FlatList<Repository>).attrs({
  contentContainerStyle: {
    paddingTop: 8,
    paddingHorizontal: 16
  }
})``

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.black
}))`
  flex: 1;
`
