import React from 'react'

import UsersProvider from './users'
import RepositoriesProvider from './repositories'

interface Props {
  children: React.ReactNode
}

export default function ContextProvider({ children }: Props) {
  return (
    <UsersProvider>
      <RepositoriesProvider>{children}</RepositoriesProvider>
    </UsersProvider>
  )
}
