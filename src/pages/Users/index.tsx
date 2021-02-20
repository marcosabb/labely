import React from 'react'

import { User, useUsers } from '../../contexts/users'

import Item from '../../components/Item'

import { Container, List } from './styles'

export default function Users() {
  const { users, deleteUser } = useUsers()

  async function handleRemove(id: number) {
    await deleteUser(id)
  }

  function keyExtractor({ id }: User) {
    return String(id)
  }

  function renderItem({
    item: { id, name, login, avatar_url, company, location, starred }
  }: {
    item: User
  }) {
    function formatStarred() {
      if (starred) {
        if (starred >= 30) return `${starred}+`

        return starred
      }

      return '-'
    }

    const tags = [
      { id: 1, icon: 'business', value: company ?? '-' },
      { id: 2, icon: 'location-on', value: location ?? '-' },
      {
        id: 3,
        icon: 'star',
        value: formatStarred()
      }
    ]

    return (
      <Item
        title={name}
        description={`@${login}`}
        avatar={avatar_url}
        tags={tags}
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
