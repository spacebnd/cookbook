import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/app-check'

const firebaseConfig = {
  apiKey: 'AIzaSyBUyxI1umlkhwHq1q8GeVMN4FOZeTCkQx4',
  authDomain: 'cookbook-9dd2a.firebaseapp.com',
  projectId: 'cookbook-9dd2a',
  databaseURL: 'https://cookbook-9dd2a-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'cookbook-9dd2a.appspot.com',
  messagingSenderId: '190851216088',
  appId: '1:190851216088:web:8f1534316ba5ba70645dad',
}

firebase.initializeApp(firebaseConfig)

const appCheck = firebase.appCheck()
appCheck.activate('6Ld9KKYcAAAAAE7tHQIiTBhoCLvvBfkq35PG63gZ', true)

export const database = firebase.database()
export const storage = firebase.storage()

export const RECIPE_IMAGES_PATH = 'recipes/'
export const DEFAULT_IMAGE_NAME = 'default-image.png'
