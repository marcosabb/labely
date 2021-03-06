import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useUsers } from 'contexts/users'

import User from 'pages/User'
import Users from 'pages/Users'
import Repositories from 'pages/Repositories'
import Actions from 'pages/Actions'

import theme from 'styles/theme'

export type RootStackParamList = {
  User: { isCreating: boolean }
  Users: undefined
  Repositories: { user: { login: string; avatar_url: string } }
  Actions: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const options = {
  screenOptions: {
    headerTitleContainerStyle: {
      padding: 16
    },
    headerStyle: {
      backgroundColor: theme.colors.foreground,
      elevation: 0
    }
  },

  pages: {
    title: ''
  }
}

export default function Routes() {
  const { users, loading, getUsers } = useUsers()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (loading.users) {
    return (
      <ActivityIndicator
        size='large'
        color={theme.colors.black}
        style={{ flex: 1 }}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options.screenOptions}
        initialRouteName={!!users && users.length > 0 ? 'Users' : 'User'}
      >
        <Stack.Screen
          name='User'
          component={User}
          options={options.pages}
          initialParams={{ isCreating: false }}
        />
        <Stack.Screen name='Users' component={Users} options={options.pages} />
        <Stack.Screen
          name='Repositories'
          component={Repositories}
          options={options.pages}
        />
        <Stack.Screen
          name='Actions'
          component={Actions}
          options={options.pages}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
