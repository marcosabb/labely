import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { User, useUsers } from 'contexts/users'

import Button from 'components/Button'
import Item from 'components/Item'

import { Container, HeaderLeft, HeaderRight, GithubIcon, List } from './styles'

interface RenderProps {
  item: User
}

export default function Users() {
  const { navigate, setOptions } = useNavigation()
  const { users, loading, deleteUser, setSelectedUser } = useUsers()

  const [userId, setUserId] = useState<number>()

  const handleNavigateToUser = useCallback(() => {
    navigate('User', { isCreating: true })
  }, [navigate])

  const handleNavigateToRepositories = useCallback(
    (user) => {
      setSelectedUser(user)
      navigate('Repositories', { user })
    },
    [navigate, setSelectedUser]
  )

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <HeaderLeft>
          <GithubIcon name='github' />
        </HeaderLeft>
      ),

      headerRight: () => (
        <HeaderRight>
          <Button
            kind='default'
            size='small'
            testID='header-button'
            onPress={handleNavigateToUser}
          >
            Adicionar novo
          </Button>
        </HeaderRight>
      )
    })
  }, [handleNavigateToUser, setOptions])

  const handleRemove = useCallback(
    async (id: number) => {
      setUserId(id)
      await deleteUser(id)
    },
    [deleteUser]
  )

  function keyExtractor({ id }: User) {
    return String(id)
  }

  function renderItem({ item }: RenderProps) {
    const { id, name, login, avatar_url, company, location } = item

    const tags = [
      { id: 1, icon: 'business', value: company },
      { id: 2, icon: 'location-on', value: location }
    ]

    return (
      <Item
        title={name}
        description={`@${login}`}
        avatar={avatar_url}
        tags={tags}
        loading={userId === id && loading.actions}
        onPress={() => handleNavigateToRepositories(item)}
        onRemove={() => handleRemove(id)}
      />
    )
  }

  return (
    <Container>
      <List data={users} keyExtractor={keyExtractor} renderItem={renderItem} />
    </Container>
  )
}
