import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from 'styled-tools'

import { FlatList } from 'react-native'
import { User } from '../../contexts/users'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme('colors.background')};
`

export const HeaderLeft = styled.View`
  margin-left: ${theme('spacing.default')};
`

export const HeaderRight = styled.View`
  margin-right: ${theme('spacing.default')};
`

export const GithubIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'github',
  color: theme.colors.black,
  size: 32
}))``

export const List = styled(FlatList as new () => FlatList<User>).attrs({
  contentContainerStyle: {
    paddingTop: 8,
    paddingHorizontal: 16
  }
})``
