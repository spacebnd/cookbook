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

export const customStyles = {
  customButtonBase: {
    margin: '0 5px 5px 0',
    padding: '4px',
    fontFamily: 'Montserrat',
    fontSize: '14px',
    textTransform: 'lowercase',
    border: 'none',
    borderRadius: '5px',
    transition:
      'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
    '&:hover': {
      boxShadow: 'none',
      transition:
        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
    },
    '&:active': {
      boxShadow: 'none',
      transition:
        'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
    },
  },

  customButtonCategory: {
    backgroundColor: '#8d95c2',
    '&:hover': {
      backgroundColor: '#8d95c2',
    },
    '&:active': {
      backgroundColor: '#7884c6',
    },
  },

  customButtonIngredient: {
    backgroundColor: '#ceded8',
    '&:hover': {
      backgroundColor: '#ceded8',
    },
    '&:active': {
      backgroundColor: '#aed5cc',
    },
  },
}
