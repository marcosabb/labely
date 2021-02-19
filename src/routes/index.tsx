import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import User from '../pages/User'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='User'>
        <Stack.Screen name='User' component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
