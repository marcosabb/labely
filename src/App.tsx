import 'react-native-gesture-handler'

import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import Routes from './routes'
import theme from './styles/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={theme.colors.foreground}
      />

      <Routes />
    </ThemeProvider>
  )
}
