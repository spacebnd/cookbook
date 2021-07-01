import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'

function App() {
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
