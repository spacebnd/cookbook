import { BrowserRouter, Switch, useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsDesktop, setDeviceData } from './store/modules/ui'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WebFont from 'webfontloader'
import Bowser from 'bowser'
import logo from './assets/images/logo-variant2.png'
import './index.css'

import LoginScreen from './screens/LoginScreen.js'
import PrivateRoute from './components/auth/PrivateRoute'
import PublicRoute from './components/auth/PublicRoute'
import HomeScreen from './screens/HomeScreen.js'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: '50px',
  },
  logo: {
    height: '100%',
  },
  inscription: {
    color: '#b43c3c',
    fontSize: '20px',
    fontWeight: '700',
  },
}))

export default function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const isDesktop = useSelector(selectIsDesktop)

  useEffect(() => {
    const deviceInfo = Bowser.getParser(window.navigator.userAgent).parsedResult
    dispatch(setDeviceData(deviceInfo))

    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    })
  }, [dispatch])

  return !isDesktop ? (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={HomeScreen} path="/" exact />
        <PublicRoute component={LoginScreen} history={history} path="/login" exact />
      </Switch>
    </BrowserRouter>
  ) : (
    <Box component="div" className={classes.root}>
      <Box className={classes.logoContainer}>
        <img className={classes.logo} src={logo} alt="CookBook logo" />
      </Box>
      <Typography className={classes.inscription}>mobile only</Typography>
    </Box>
  )
}
