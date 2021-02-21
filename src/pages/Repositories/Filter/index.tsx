import React, { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { useRepositories } from '../../../contexts/repositories'
import { useUsers } from '../../../contexts/users'

import Input from '../../../components/Input'

import {
  Container,
  Fields,
  Labels,
  LabelItem,
  LabelText,
  CreateButton,
  PlusIcon,
  DeleteButton,
  CloseIcon
} from './styles'

interface Filters {
  name: string
  labels: string[]
}

interface Expanded {
  name: boolean
  label: boolean
}

export default function Filter() {
  const { filterRepositories } = useRepositories()
  const { currentUser } = useUsers()

  const [label, setLabel] = useState('')
  const [filters, setFilters] = useState<Filters>({
    name: '',
    labels: ['react', 'javascript']
  })
  const [expanded, setExpanded] = useState<Expanded>({
    name: true,
    label: false
  })

  const handleChangeLabel = useCallback((value) => {
    setLabel(value)
    // setFilters((state) => ({
    //   ...state,
    //   labels: [...new Set([...state.labels, value])]
    // }))
  }, [])

  const handleChangeName = useCallback(async (value) => {
    setFilters((state) => ({
      ...state,
      name: value
    }))
  }, [])

  const debounced = useDebouncedCallback(async () => {
    await filterRepositories(currentUser, filters)
  }, 1000)

  const handleExpand = useCallback(
    (key: string) => {
      // const filterState = Object.keys(filters).reduce(
      //   (total, current) => ({
      //     ...total,
      //     [current]: Array.isArray(current) ? [] : ''
      //   }),
      //   {}
      // ) as Filters

      const expandedState = Object.keys(expanded).reduce(
        (total, current) => ({ ...total, [current]: key === current }),
        {}
      ) as Expanded

      // setFilters(filterState)
      setExpanded(expandedState)
    },
    [expanded]
  )

  return (
    <Container>
      <Fields>
        <Input
          name='name'
          value={filters.name}
          icon='search'
          color='primary'
          onChangeText={(value) => {
            handleChangeName(value)
            debounced.callback()
          }}
          onExpand={() => {
            !expanded.name && handleExpand('name')
          }}
          expanded={expanded.name}
          direction={expanded.name ? 'right' : undefined}
        />

        <Input
          name='label'
          value={label}
          icon='filter-list'
          color='primary'
          onChangeText={(value) => {
            handleChangeLabel(value)
            // debounced.callback()
          }}
          onExpand={() => {
            !expanded.label && handleExpand('label')
          }}
          expanded={expanded.label}
          direction={expanded.label ? 'left' : undefined}
        />
      </Fields>

      <Labels>
        {filters.labels.map((label) => (
          <LabelItem key={label}>
            <LabelText numberOfLines={1}>{label}</LabelText>

            <DeleteButton>
              <CloseIcon name='close' />
            </DeleteButton>
          </LabelItem>
        ))}

        {!!label && (
          <LabelItem>
            <LabelText numberOfLines={1}>{label}</LabelText>

            <CreateButton>
              <PlusIcon name='add' />
            </CreateButton>
          </LabelItem>
        )}
      </Labels>
    </Container>
  )
}
