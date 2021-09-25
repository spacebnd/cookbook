import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import firebase from 'firebase/app'
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setIsUserAuth } from '../store/modules/auth'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Loader from '../components/common/Loader'
import { selectIsLoading, setIsLoading } from '../store/modules/ui'

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    visibility: 'hidden',
  },
}))

export default function LoginScreen() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setIsUserAuth(true))
        history.push('/')
      }

      dispatch(setIsLoading(false))
    })
    return () => unregisterAuthObserver()
  }, [dispatch, history])

  const uiConfig = {
    signInFlow: 'redirect',
    callbacks: {
      signInSuccessWithAuthResult: ({ user }) => {
        if (user) {
          dispatch(setIsUserAuth(true))
          history.push('/')
        }
      },
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  }

  return (
    <Box component="div" className={classes.root}>
      <Box className={isLoading ? classes.hidden : null}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Box>
      {isLoading && <Loader />}
    </Box>
  )
}
