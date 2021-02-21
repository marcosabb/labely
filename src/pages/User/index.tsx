import React, { useState, useCallback } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'

import { useUsers } from 'contexts/users'
import { useRepositories } from 'contexts/repositories'

import { RootStackParamList } from 'routes'

import Input from 'components/Input'
import Button from 'components/Button'

import {
  Container,
  Header,
  GithubIcon,
  Form,
  Title,
  Description,
  Field,
  Policies,
  PoliciesText
} from './styles'

export default function Home() {
  const { navigate } = useNavigation()
  const { params } = useRoute<RouteProp<RootStackParamList, 'User'>>()
  const { users, createUser, loading: loadingUsers } = useUsers()
  const { createRepositories, loading: loadingRepositories } = useRepositories()

  const [user, setUser] = useState('')

  const handleChange = useCallback((value: string) => {
    setUser(value)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!user) return

    const userExists = users.some((current) => current.login === user)

    if (userExists) {
      navigate('Users')

      return
    }

    await createUser(user)
    await createRepositories(user)

    setUser('')
    navigate('Users')
  }, [createRepositories, createUser, navigate, user, users])

  return (
    <Container>
      <Header>
        <GithubIcon name='github' />
      </Header>

      <Form>
        <Title>Buscar usuário</Title>
        <Description>
          {params.isCreating
            ? 'Adicione seus novos usuários do GitHub'
            : 'Crie sua conta através do seu usuário do GitHub'}
        </Description>

        <Field>
          <Input
            name='user'
            value={user}
            placeholder='Digite o usuário'
            icon='account-circle'
            color='secondary'
            onChangeText={handleChange}
            testID='user-input'
          />
        </Field>

        <Button
          kind='default'
          size='default'
          testID='user-button'
          onPress={handleSubmit}
          loading={loadingUsers.actions || loadingRepositories.actions}
          disabled={!user}
        >
          Cadastrar
        </Button>
      </Form>

      <Policies>
        <PoliciesText>Termos de política e privacidade</PoliciesText>
      </Policies>
    </Container>
  )
}
