import React from 'react'
import { render, RenderOptions } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import theme from 'styles/theme'

interface Props {
  children: React.ReactNode
}

function ThemeWrapper({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: ThemeWrapper, ...options })

export * from '@testing-library/react-native'

export { customRender as render }
