import 'styled-components'

// and extend it
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
      foreground: string
      text: string
      title: string
      icon: string
      iconBackground: string
      white: string
      black: string
      blue: string
      yellow: string
      alphaYellow: string
    }

    spacing: {
      xxs: string
      xs: string
      sm: string
      default: string
      md: string
      lg: string
      xlg: string
    }

    typography: {
      families: {
        regular: string
        bold: string
      }

      sizes: {
        xs: string
        sm: string
        default: string
        md: string
        lg: string
      }
    }

    radius: {
      sm: string
      default: string
    }

    borders: {
      default: string
    }
  }
}
