import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api'
import github from '../services/github'

interface Props {
  children: React.ReactNode
}

interface Label {
  id: number
  value: string
}

export interface Repository {
  id: number
  name: string
  description: string
  labels: Label[]
  language: string
  stargazers_count: number
  updated_at: string
}

interface RepositoriesContextProps {
  repositories: Repository[]
  loading: {
    repositories: boolean
    actions: boolean
  }
  getRepositories: (login: string) => Promise<void> | void
  createRepositories: (login: string) => Promise<void> | void
}

const RepositoriesContext = createContext<RepositoriesContextProps>({
  repositories: [],
  loading: {
    repositories: false,
    actions: false
  },
  getRepositories: () => {},
  createRepositories: () => {}
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

      const data = repositories[0].items

      setRepositories(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        repositories: true
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

      await api.post('repositories', { user: login, items: data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        actions: false
      }))
    }
  }, [])

  return (
    <RepositoriesContext.Provider
      value={{
        repositories,
        loading,
        getRepositories,
        createRepositories
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
