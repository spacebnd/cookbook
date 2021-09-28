import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsUserAuth } from '../../store/modules/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isUserAuth = useSelector(selectIsUserAuth)

  return (
    <Route
      {...rest}
      render={(props) => {
        return isUserAuth ? <Component {...props} /> : <Redirect to="/login" />
      }}
    />
  )
}

export default PrivateRoute
