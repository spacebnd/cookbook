import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.scss'
import App from './App'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './common/theme.js'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
