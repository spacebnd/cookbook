import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import WebFont from 'webfontloader'
import { useEffect } from 'react'
import { subscribeToAllEntities } from './store/modules/entities'
import { useDispatch } from 'react-redux'
import { ENTITIES } from './common/constants'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    })

    Object.values(ENTITIES).forEach((entity) => {
      dispatch(subscribeToAllEntities(entity.value))
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
