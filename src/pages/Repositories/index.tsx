import React, { useEffect } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import { formatDistanceStrict, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Repository, useRepositories } from '../../contexts/repositories'

import { RootStackParamList } from '../../routes'

import Item from '../../components/Item'

import { Container, List } from './styles'

interface RenderProps {
  item: Repository
}

export default function Repositories() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Repositories'>>()
  const { repositories, getRepositories } = useRepositories()

  useEffect(() => {
    async function getUserRepositories() {
      const { login } = params

      await getRepositories(login)
    }

    getUserRepositories()
  }, [getRepositories, params])

  // useEffect(() => {
  //   setOptions({
  //     headerLeft: () => (
  //       <HeaderLeft>
  //         <GithubIcon />
  //       </HeaderLeft>
  //     ),

  //     headerRight: () => (
  //       <HeaderRight>
  //         <Button
  //           size='small'
  //           testID='header-button'
  //           onPress={handleNavigateToUser}
  //         >
  //           Adicionar novo
  //         </Button>
  //       </HeaderRight>
  //     )
  //   })
  // }, [handleNavigateToUser, setOptions])

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
        value: formatDistanceStrict(parseISO(updated_at), new Date(), {
          addSuffix: true,
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
      <List
        data={repositories}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Container>
  )
}
