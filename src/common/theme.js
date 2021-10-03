import { createTheme } from '@material-ui/core'

export const theme = createTheme({
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
    color: '#2d8365',
  },
  statusAlertError: {
    color: '#b22e2e',
  },
}
