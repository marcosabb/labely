import React, { useEffect } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { formatDistance, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Repository, useRepositories } from '../../contexts/repositories'

import { RootStackParamList } from '../../routes'

import Item from '../../components/Item'
import Filter from './Filter'

import { Container, List, HeaderRight, Avatar, Loading } from './styles'

interface RenderProps {
  item: Repository
}

export default function Repositories() {
  const { setOptions } = useNavigation()
  const { params } = useRoute<RouteProp<RootStackParamList, 'Repositories'>>()

  const { repositories, loading, getRepositories } = useRepositories()

  useEffect(() => {
    async function getUserRepositories() {
      const { user } = params
      const { login } = user

      await getRepositories(login)
    }

    getUserRepositories()
  }, [getRepositories, params])

  useEffect(() => {
    const { user } = params
    const { avatar_url } = user

    setOptions({
      headerRight: () => (
        <HeaderRight>
          <Avatar source={{ uri: avatar_url }} />
        </HeaderRight>
      )
    })
  }, [params, setOptions])

  function keyExtractor({ id }: Repository) {
    return String(id)
  }

  function renderItem({
    item: { name, description, language, stargazers_count, updated_at, labels }
  }: RenderProps) {
    const tags = [
      { id: 1, icon: 'language', value: language },
      { id: 2, icon: 'star', value: stargazers_count },
      {
        id: 3,
        icon: 'query-builder',
        value: formatDistance(parseISO(updated_at), new Date(), {
          locale: ptBR
        })
      }
    ]

    return (
      <Item
        title={name}
        description={description}
        labels={labels}
        tags={tags}
        onPress={() => {}}
        highlight
      />
    )
  }

  return (
    <Container>
      <Filter />

      {loading.repositories ? (
        <Loading size='large' />
      ) : (
        <List
          data={repositories}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </Container>
  )
}
