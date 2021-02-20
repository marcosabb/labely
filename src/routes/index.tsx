import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {} from 'react-native'

import { useUsers } from '../contexts/users'

import User from '../pages/User'
import Users from '../pages/Users'

import theme from '../styles/theme'

export type RootStackParamList = {
  Users: undefined
  User: { isCreating: boolean }
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
  const { getUsers } = useUsers()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options.screenOptions}
        initialRouteName='User'
      >
        <Stack.Screen
          name='User'
          component={User}
          options={options.pages}
          initialParams={{ isCreating: false }}
        />
        <Stack.Screen name='Users' component={Users} options={options.pages} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
