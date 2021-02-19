import React, { createContext, useContext, useState } from 'react'

import api from '../services/api'

interface Props {
  children: React.ReactNode
}

interface User {
  avatar_url: string
  login: string
  company?: string
  location?: string
  starred?: number
}

interface UsersContextProps {
  users: User[]
  loading: boolean
  fetchUser: (name: string) => Promise<void> | void
}

const UsersContext = createContext<UsersContextProps>({
  users: [],
  loading: false,
  fetchUser: () => {}
})

export default function UsersProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchUser(name: string) {
    try {
      setLoading(true)

      const { data } = await api.get(`users/${name}`)
      const { data: starred } = await api.get(`users/${name}/starred`)

      const user = {
        avatar_url: data.avatar_url,
        login: data.login,
        company: data.company,
        location: data.location,
        starred: starred.length
      }

      setUsers((prevState) => [...prevState, user])

      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  console.log(users)

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        fetchUser
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
