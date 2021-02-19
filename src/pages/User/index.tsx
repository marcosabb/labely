import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ThemeContext } from 'styled-components'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Header,
  Form,
  Title,
  Description,
  Field,
  Policies,
  PoliciesText
} from './styles'

export default function Home() {
  const theme = useContext(ThemeContext)

  const [user, setUser] = useState('')

  function handleChange(value: string) {
    setUser(value)
  }

  function handleSubmit() {
    console.log(user)
  }

  return (
    <Container>
      <Header>
        <Icon name='github' color={theme.colors.black} size={100} />
      </Header>

      <Form>
        <Title>Buscar usuário</Title>
        <Description>
          Crie sua conta através do seu usuário do GitHub
        </Description>

        <Field>
          <Input
            name='user'
            placeholder='Digite o usuário'
            icon='account-circle'
            onChangeText={handleChange}
          />
        </Field>

        <Button onPress={handleSubmit}>Cadastrar</Button>
      </Form>

      <Policies>
        <PoliciesText>Termos de política e privacidade</PoliciesText>
      </Policies>
    </Container>
  )
}
