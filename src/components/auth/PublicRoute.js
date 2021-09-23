import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsUserAuth } from '../../store/modules/auth'

const PublicRoute = ({ component: Component, ...rest }) => {
  const isUserAuth = useSelector(selectIsUserAuth)

  return (
    <Route
      {...rest}
      render={(props) => {
        return isUserAuth ? <Redirect to="/" /> : <Component {...props} />
      }}
    />
  )
}

export default PublicRoute
