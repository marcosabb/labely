import { rgba } from 'polished'

export default {
  colors: {
    background: '#e5e5e5',
    foreground: '#fff',
    text: '#7e7e7e',
    title: '#000',
    modal: rgba('#000', 0.72),
    gray: '#e5e5e5',
    mediumgray: '#e8e8e8',
    white: '#fff',
    black: '#000',
    alphaBlack: rgba('#000', 0.08),
    blue: '#0017ff',
    yellow: '#ffc700',
    alphaYellow: rgba('#ffc700', 0.16)
  },

  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '10px',
    default: '16px',
    md: '24px',
    lg: '32px',
    xlg: '40px'
  },

  typography: {
    families: {
      regular: 'Mulish-Regular',
      bold: 'Mulish-Bold'
    },

    sizes: {
      xs: '12px',
      sm: '14px',
      default: '16px',
      md: '22px',
      lg: '28px'
    }
  },

  radius: {
    sm: '4px',
    default: '8px'
  },

  borders: {
    default: '1px solid #e5e5e5'
  }
}
