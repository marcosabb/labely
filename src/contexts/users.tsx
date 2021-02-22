import React, { createContext, useCallback, useContext, useState } from 'react'

import api from 'services/api'
import github from 'services/github'

interface Props {
  children: React.ReactNode
}

export interface User {
  id: number
  name: string
  avatar_url: string
  login: string
  company?: string
  location?: string
}

interface UsersContextProps {
  users: User[]
  currentUser: User
  loading: {
    users: boolean
    actions: boolean
  }
  getUsers: () => Promise<void> | void
  createUser: (login: string) => Promise<void> | void
  deleteUser: (id: number) => Promise<void> | void
  setSelectedUser: (user: User) => void
}

const UsersContext = createContext<UsersContextProps>({
  users: [],
  currentUser: {} as User,
  loading: {
    users: false,
    actions: false
  },
  getUsers: () => {},
  createUser: () => {},
  deleteUser: () => {},
  setSelectedUser: () => {}
})

export default function UsersProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [loading, setLoading] = useState({
    users: false,
    actions: false
  })

  const setSelectedUser = useCallback((user) => {
    setCurrentUser(user)
  }, [])

  const getUsers = useCallback(async () => {
    try {
      setLoading((state) => ({
        ...state,
        users: true
      }))

      const { data: users } = await api.get('/users')

      setUsers(users)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        users: false
      }))
    }
  }, [])

  const createUser = useCallback(async (login: string) => {
    try {
      setLoading((state) => ({
        ...state,
        actions: true
      }))

      const { data: response } = await github.get(`users/${login}`)

      const data = {
        id: response.id,
        name: response.name,
        avatar_url: response.avatar_url,
        login: response.login,
        company: response.company,
        location: response.location
      }

      const { data: user } = await api.post('users', data)

      setUsers((state) => [...state, user])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading((state) => ({
        ...state,
        actions: false
      }))
    }
  }, [])

  const deleteUser = useCallback(async (id: number) => {
    try {
      setLoading((state) => ({
        ...state,
        actions: true
      }))

      await api.delete(`users/${id}`)

      setUsers((state) => state.filter((user) => user.id !== id))
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
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        loading,
        getUsers,
        createUser,
        deleteUser,
        setSelectedUser
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)

  if (!context) {
    throw new Error('useUsers must be used within a UsersContext')
  }

  return context
}
