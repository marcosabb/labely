import React, { useState, useEffect, useCallback } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { useRepositories } from 'contexts/repositories'

import Input from 'components/Input'
import Button from 'components/Button'

import {
  Container,
  Wrapper,
  Title,
  Field,
  Suggestions,
  SuggestionsText,
  Labels,
  LabelItem,
  LabelText,
  CreateButton,
  PlusIcon,
  DeleteButton,
  CloseIcon,
  Buttons
} from './styles'

export default function Actions() {
  const theme = useTheme()
  const { navigate, setOptions } = useNavigation()
  const { currentRepository, loading, updateRepository } = useRepositories()

  const [label, setLabel] = useState('')
  const [labels, setLabels] = useState<string[]>(currentRepository.labels ?? [])
  const [suggestions] = useState(['React', 'NodeJS', 'React Native'])

  useEffect(() => {
    setOptions({
      headerShown: false
    })
  }, [setOptions])

  const handleChangeLabel = useCallback((value) => {
    setLabel(value)
  }, [])

  const handleCreateLabel = useCallback(
    (suggestion?: string) => {
      if (suggestion) {
        setLabels((state) => [...new Set([...state, suggestion])])
        return
      }

      setLabel('')
      setLabels((state) => [...new Set([...state, label])])
    },
    [label]
  )

  const handleRemoveLabel = useCallback((label) => {
    setLabels((state) => state.filter((_, index) => index !== label))
  }, [])

  const handleUpdateRepository = useCallback(async () => {
    const repository = { ...currentRepository, labels }
    await updateRepository(
      currentRepository.login,
      currentRepository.id,
      repository
    )
    navigate('Repositories')
  }, [currentRepository, labels, navigate, updateRepository])

  const handleCancel = useCallback(() => {
    navigate('Repositories')
  }, [navigate])

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.colors.black}
      />

      <Wrapper>
        <Title>Adicionar tags</Title>

        <Field>
          <Input
            name='label'
            icon='search'
            color='primary'
            value={label}
            onChangeText={handleChangeLabel}
          />
        </Field>

        <Labels>
          {!!labels &&
            labels.length > 0 &&
            labels.map((label, index) => (
              <LabelItem key={label}>
                <LabelText numberOfLines={1}>{label}</LabelText>

                <DeleteButton onPress={() => handleRemoveLabel(index)}>
                  <CloseIcon name='close' />
                </DeleteButton>
              </LabelItem>
            ))}

          {!!label && (
            <LabelItem>
              <LabelText numberOfLines={1}>{label}</LabelText>

              <CreateButton onPress={() => handleCreateLabel()}>
                <PlusIcon name='add' />
              </CreateButton>
            </LabelItem>
          )}
        </Labels>

        <Suggestions>
          <SuggestionsText>Sugestões</SuggestionsText>

          <Labels>
            {suggestions
              .filter(
                (suggestion) =>
                  !labels
                    .map((label) => label.toLowerCase())
                    .includes(suggestion.toLowerCase())
              )
              .map((suggestion) => (
                <LabelItem key={suggestion}>
                  <LabelText numberOfLines={1}>{suggestion}</LabelText>

                  <CreateButton onPress={() => handleCreateLabel(suggestion)}>
                    <PlusIcon name='add' />
                  </CreateButton>
                </LabelItem>
              ))}
          </Labels>
        </Suggestions>

        <Buttons>
          <Button
            kind='default'
            size='default'
            loading={loading.actions}
            onPress={handleUpdateRepository}
          >
            Salvar
          </Button>

          <Button kind='text' size='default' onPress={handleCancel}>
            Cancelar
          </Button>
        </Buttons>
      </Wrapper>
    </Container>
  )
}
