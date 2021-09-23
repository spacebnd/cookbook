import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import WebFont from 'webfontloader'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, useHistory } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import PublicRoute from './components/auth/PublicRoute'
import './index.css'

export default function App() {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={HomeScreen} path="/" exact />
        <PublicRoute component={LoginScreen} history={history} path="/login" exact />
      </Switch>
    </BrowserRouter>
  )
}
