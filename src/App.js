import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
