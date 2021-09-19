import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import WebFont from 'webfontloader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsUserAuth, setIsUserAuth } from './store/modules/auth'
import firebase from 'firebase/app'

export default function App() {
  const dispatch = useDispatch()
  const isUserAuth = useSelector(selectIsUserAuth)

  firebase.auth().onAuthStateChanged((user) => {
    dispatch(setIsUserAuth(!!user))
  })

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    })
  }, [dispatch])

  return isUserAuth ? <HomeScreen /> : <LoginScreen />
}
