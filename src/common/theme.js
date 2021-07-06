import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e4ffff',
      main: '#b1ddd9',
      dark: '#81aba8',
      contrastText: '#212121',
    },
    secondary: {
      light: '#f8fdff',
      main: '#c5cae9',
      dark: '#9499b7',
      contrastText: '#606060',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})
