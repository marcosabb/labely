import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { User, useUsers } from '../../contexts/users'

import Button from '../../components/Button'
import Item from '../../components/Item'

import { Container, HeaderLeft, HeaderRight, GithubIcon, List } from './styles'

interface RenderProps {
  item: User
}

export default function Users() {
  const { navigate, setOptions } = useNavigation()
  const { users, loading, deleteUser } = useUsers()

  const [userId, setUserId] = useState<number>()

  const handleNavigateToUser = useCallback(() => {
    navigate('User', { isCreating: true })
  }, [navigate])

  const handleNavigateToRepositories = useCallback(
    (login) => {
      navigate('Repositories', { login })
    },
    [navigate]
  )

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <HeaderLeft>
          <GithubIcon />
        </HeaderLeft>
      ),

      headerRight: () => (
        <HeaderRight>
          <Button
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

  function renderItem({
    item: { id, name, login, avatar_url, company, location }
  }: RenderProps) {
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
        onPress={() => handleNavigateToRepositories(login)}
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
