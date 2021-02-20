import React, { useState, useCallback } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'

import { useUsers } from '../../contexts/users'
import { RootStackParamList } from '../../routes'

import Input from '../../components/Input'
import Button from '../../components/Button'

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
  const { createUser, loading } = useUsers()

  const [user, setUser] = useState('')

  const handleChange = useCallback((value: string) => {
    setUser(value)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!user) return

    await createUser(user)

    setUser('')
    navigate('Users')
  }, [createUser, navigate, user])

  return (
    <Container>
      <Header>
        <GithubIcon />
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
            onChangeText={handleChange}
            testID='user-input'
          />
        </Field>

        <Button
          onPress={handleSubmit}
          loading={loading.actions}
          disabled={!user}
          size='default'
          testID='user-button'
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
