import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useUsers } from '../contexts/users'

import User from '../pages/User'
import Users from '../pages/Users'

import theme from '../styles/theme'

const Stack = createStackNavigator()

const options = {
  screenOptions: {
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
        initialRouteName='Users'
      >
        <Stack.Screen name='User' component={User} options={options.pages} />
        <Stack.Screen name='Users' component={Users} options={options.pages} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
