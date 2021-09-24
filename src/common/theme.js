import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#19b6b6',
      main: '#2b958c',
      dark: '#22403e',
      contrastText: '#212121',
    },
    secondary: {
      light: '#9630a1',
      main: '#582d95',
      dark: '#442440',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})

export const customStyles = {
  customButtonBase: {
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

  statusAlertSuccess: {
    color: '#4ebb92',
    justifyContent: 'center',
  },

  statusAlertError: {
    color: '#b22e2e',
    justifyContent: 'center',
  },
}
