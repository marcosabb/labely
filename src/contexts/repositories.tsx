import React, { createContext, useCallback, useContext, useState } from 'react'

import api from 'services/api'
import github from 'services/github'

import { User } from './users'

interface Props {
  children: React.ReactNode
}

export interface Repository {
  id: number
  name: string
  description: string
  labels: string[]
  language: string
  stargazers_count: number
  updated_at: string
}

interface Filters {
  name: string
  labels: string[]
}

interface RepositoriesContextProps {
  repositories: Repository[]
  loading: {
    repositories: boolean
    actions: boolean
  }
  getRepositories: (login: string) => Promise<void> | void
  createRepositories: (login: string) => Promise<void> | void
  filterRepositories: (user: User, filters: Filters) => Promise<void> | void
}

const RepositoriesContext = createContext<RepositoriesContextProps>({
  repositories: [],
  loading: {
    repositories: false,
    actions: false
  },
  getRepositories: () => {},
  createRepositories: () => {},
  filterRepositories: () => {}
})

export default function RepositoriesProvider({ children }: Props) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState({
    repositories: false,
    actions: false
  })

  const getRepositories = useCallback(async (login) => {
    try {
      setLoading((state) => ({
        ...state,
        repositories: true
      }))

      const { data: repositories } = await api.get(
        `/repositories/?user=${login}`
      )

      setRepositories(repositories)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        repositories: false
      }))
    }
  }, [])

  const createRepositories = useCallback(async (login) => {
    try {
      setLoading((state) => ({
        ...state,
        actions: true
      }))

      const { data: repositoriesResponse } = await github.get<Repository[]>(
        `users/${login}/starred`
      )

      const data = repositoriesResponse.map(
        ({
          id,
          name,
          description,
          language,
          stargazers_count,
          updated_at
        }) => ({
          login,
          id,
          name,
          description,
          labels: [],
          language,
          stargazers_count,
          updated_at
        })
      )

      await api.post('/repositories', data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        actions: false
      }))
    }
  }, [])

  const filterRepositories = useCallback(async (user, filters) => {
    try {
      setLoading((state) => ({
        ...state,
        repositories: true
      }))

      const { name, labels } = filters
      const { login } = user

      const { data: repositories } = await api.get(
        `repositories/?login=${login}&name_like=${name}&labels_like=${labels}`
      )

      console.log(repositories)

      setRepositories(repositories)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        repositories: false
      }))
    }
  }, [])

  return (
    <RepositoriesContext.Provider
      value={{
        repositories,
        loading,
        getRepositories,
        createRepositories,
        filterRepositories
      }}
    >
      {children}
    </RepositoriesContext.Provider>
  )
}

export function useRepositories() {
  const context = useContext(RepositoriesContext)

  if (!context) {
    throw new Error('useRepositories must be used within a RepositoriesContext')
  }

  return context
}
