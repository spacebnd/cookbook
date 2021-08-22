import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import WebFont from 'webfontloader'
import { useEffect } from 'react'
import { getAllRecipes } from './store/modules/entities'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    })

    dispatch(getAllRecipes())
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

export default App
