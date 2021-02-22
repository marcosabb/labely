import React, { createContext, useCallback, useContext, useState } from 'react'

import api from 'services/api'
import github from 'services/github'

interface Props {
  children: React.ReactNode
}

export interface Repository {
  id: number
  name: string
  login: string
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
  currentRepository: Repository
  loading: {
    repositories: boolean
    actions: boolean
  }
  getRepositories: (userId: string) => Promise<void> | void
  createRepositories: (userId: string) => Promise<void> | void
  updateRepository: (
    userId: string,
    repositoryId: number,
    data: Repository
  ) => Promise<void> | void
  deleteRepositories: (userId: string) => Promise<void> | void
  filterRepositories: (userId: string, filters: Filters) => Promise<void> | void
  setSelectedRepository: (repository: Repository) => void
}

const RepositoriesContext = createContext<RepositoriesContextProps>({
  repositories: [],
  currentRepository: {} as Repository,
  loading: {
    repositories: false,
    actions: false
  },
  getRepositories: () => {},
  createRepositories: () => {},
  updateRepository: () => {},
  deleteRepositories: () => {},
  filterRepositories: () => {},
  setSelectedRepository: () => {}
})

export default function RepositoriesProvider({ children }: Props) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [currentRepository, setCurrentRepository] = useState<Repository>(
    {} as Repository
  )
  const [loading, setLoading] = useState({
    repositories: false,
    actions: false
  })

  const getRepositories = useCallback(async (userId) => {
    try {
      setLoading((state) => ({
        ...state,
        repositories: true
      }))

      const { data: repositories } = await api.get(`/repositories/${userId}`)

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

  const createRepositories = useCallback(async (userId) => {
    try {
      setLoading((state) => ({
        ...state,
        actions: true
      }))

      const { data: repositories } = await github.get<Repository[]>(
        `users/${userId}/starred`
      )

      const data = repositories.map(
        ({
          id: repositoryId,
          name,
          description,
          language,
          stargazers_count,
          updated_at
        }) => ({
          id: repositoryId,
          login: userId,
          name,
          description,
          labels: [],
          language,
          stargazers_count,
          updated_at
        })
      )

      await api.post('/repositories', { id: userId, repositories: data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        actions: false
      }))
    }
  }, [])

  const updateRepository = useCallback(async (userId, repositoryId, data) => {
    try {
      setLoading((state) => ({
        ...state,
        actions: true
      }))

      await api.put(`repositories/${userId}/${repositoryId}`, data)

      setRepositories((state) =>
        state.map((repository) =>
          repository.id === repositoryId ? data : repository
        )
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        actions: false
      }))
    }
  }, [])

  const deleteRepositories = useCallback(async (userId) => {
    try {
      setLoading((state) => ({
        ...state,
        actions: true
      }))

      await api.delete(`repositories/${userId}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        actions: false
      }))
    }
  }, [])

  const filterRepositories = useCallback(async (userId, filters) => {
    try {
      setLoading((state) => ({
        ...state,
        repositories: true
      }))

      const { name, labels } = filters

      const { data: repositories } = await api.get(
        `repositories/${userId}/?name=${name}&labels=${labels}`
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

  const setSelectedRepository = useCallback((repository) => {
    setCurrentRepository(repository)
  }, [])

  return (
    <RepositoriesContext.Provider
      value={{
        repositories,
        currentRepository,
        loading,
        getRepositories,
        createRepositories,
        updateRepository,
        deleteRepositories,
        filterRepositories,
        setSelectedRepository
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
