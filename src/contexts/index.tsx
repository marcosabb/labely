import React from 'react'

import UsersProvider from './users'

interface Props {
  children: React.ReactNode
}

export default function ContextProvider({ children }: Props) {
  return <UsersProvider>{children}</UsersProvider>
}
