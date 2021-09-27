import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c5cae9',
      main: '#9499b7',
      dark: '#51546c',
      contrastText: '#212121FF',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
})

export const customStyles = {
  background: '#eeeeee',
  card: '#ffffff',
  customButton: {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    textTransform: 'lowercase',
    border: 'none',
    borderRadius: '5px',
    color: '#212121FF',
    backgroundColor: '#eef2fd',
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
