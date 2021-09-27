import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c5cae9',
      main: '#9499b7',
      dark: '#51546c',
      contrastText: '#212121',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})

export const customStyles = {
  background: '#eeeeee',
  card: '#ffffff',
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
  customButton: {
    backgroundColor: '#eef2fd',
    '&:hover': {
      backgroundColor: '#bedaee',
    },
    '&:active': {
      backgroundColor: '#bedaee',
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
