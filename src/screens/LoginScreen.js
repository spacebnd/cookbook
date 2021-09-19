import React from 'react'
import { Box } from '@material-ui/core'
import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase/app'
import { authUi } from '../common/firebase'

export default function LoginScreen() {
  const firebaseAuthUiConfig = {
    callbacks: {
      uiShown: () => {
        console.log('firebase auth ui is shown')
      },
    },
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  }

  authUi.start('#firebaseui-auth-container', firebaseAuthUiConfig)

  return (
    <Box component="div">
      <div id="firebaseui-auth-container" />
    </Box>
  )
}
