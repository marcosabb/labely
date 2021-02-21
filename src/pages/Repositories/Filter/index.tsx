import React, { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { useRepositories } from '../../../contexts/repositories'
import { useUsers } from '../../../contexts/users'

import Input from '../../../components/Input'

import { Container } from './styles'

interface Filters {
  name: string
  label: string
}

interface Expanded {
  name: boolean
  label: boolean
}

export default function Filter() {
  const { filterRepositories } = useRepositories()
  const { currentUser } = useUsers()

  const [filters, setFilters] = useState<Filters>({
    name: '',
    label: ''
  })
  const [expanded, setExpanded] = useState<Expanded>({
    name: true,
    label: false
  })

  const handleChange = useCallback(async ({ value, name }) => {
    setFilters((state) => ({
      ...state,
      [name]: value
    }))
  }, [])

  const debounced = useDebouncedCallback(async () => {
    await filterRepositories(currentUser, filters)
  }, 1000)

  const handleExpand = useCallback(
    (key: string) => {
      const filterState = Object.keys(filters).reduce(
        (total, current) => ({ ...total, [current]: '' }),
        {}
      ) as Filters

      const expandedState = Object.keys(expanded).reduce(
        (total, current) => ({ ...total, [current]: key === current }),
        {}
      ) as Expanded

      setExpanded(expandedState)
      setFilters(filterState)
    },
    [expanded, filters]
  )

  return (
    <Container>
      <Input
        name='name'
        value={filters.name}
        icon='search'
        color='primary'
        onChangeText={(value) => {
          handleChange({ name: 'name', value })
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
        value={filters.label}
        icon='filter-list'
        color='primary'
        onChangeText={(value) => {
          handleChange({ name: 'label', value })
          debounced.callback()
        }}
        onExpand={() => {
          !expanded.label && handleExpand('label')
        }}
        expanded={expanded.label}
        direction={expanded.label ? 'left' : undefined}
      />
    </Container>
  )
}
