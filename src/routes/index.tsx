import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { navigationRef } from './RootNavigation'

import User from '../pages/User'

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
    user: {
      title: ''
    }
  }
}

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={options.screenOptions}
        initialRouteName='User'
      >
        <Stack.Screen
          name='User'
          component={User}
          options={options.pages.user}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
