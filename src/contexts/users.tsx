import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

import api from '../services/api'

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
  starred?: number
}

interface UsersContextProps {
  users: User[]
  loading: boolean
  createUser: (login: string) => Promise<void> | void
  deleteUser: (id: number) => Promise<void> | void
}

const UsersContext = createContext<UsersContextProps>({
  users: [],
  loading: false,
  createUser: () => {},
  deleteUser: () => {}
})

export default function UsersProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getInitialUsers() {
      try {
        const storedUsers = await AsyncStorage.getItem('@labely:users')
        const currentUsers = storedUsers !== null ? JSON.parse(storedUsers) : []

        setUsers(currentUsers)
      } catch (error) {
        console.log(error)
      }
    }

    getInitialUsers()
  }, [])

  async function storeUser(user: User) {
    try {
      const userExists = users.some((current) => current.id === user.id)

      if (userExists) return

      const storedUsers = await AsyncStorage.getItem('@labely:users')
      const currentUsers = storedUsers !== null ? JSON.parse(storedUsers) : []
      const updateUsers = JSON.stringify([...currentUsers, user])

      await AsyncStorage.setItem('@labely:users', updateUsers)

      setUsers((prevState) => [...prevState, user])
    } catch (error) {
      console.log(error)
    }
  }

  async function createUser(login: string) {
    try {
      setLoading(true)

      const { data } = await api.get(`users/${login}`)
      const { data: starred } = await api.get(`users/${login}/starred`)

      function formatName() {
        if (data.name) {
          const splited = data.name.split(' ')

          if (splited.length > 2) {
            const [name, surname] = splited

            return `${name} ${surname}`
          }

          return data.name
        }

        return '-'
      }

      const user = {
        id: data.id,
        name: formatName(),
        avatar_url: data.avatar_url,
        login: data.login,
        company: data.company,
        location: data.location,
        starred: starred.length
      }

      storeUser(user)

      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteUser(id: number) {
    console.log(id)
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        createUser,
        deleteUser
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
