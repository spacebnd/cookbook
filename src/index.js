import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './common/theme.js'

import App from './App'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
