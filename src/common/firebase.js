import firebase from 'firebase/app'
import 'firebase/database'
import * as firebaseui from 'firebaseui'

const firebaseConfig = {
  apiKey: 'AIzaSyBUyxI1umlkhwHq1q8GeVMN4FOZeTCkQx4',
  authDomain: 'cookbook-9dd2a.firebaseapp.com',
  databaseURL: 'https://cookbook-9dd2a-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cookbook-9dd2a',
  storageBucket: 'cookbook-9dd2a.appspot.com',
  messagingSenderId: '190851216088',
  appId: '1:190851216088:web:8f1534316ba5ba70645dad',
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export const authUi = new firebaseui.auth.AuthUI(firebase.auth())
