import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/navigation'
import { firebaseConfig } from './firebase'

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const flamelinkApp = flamelink({
  firebaseApp,
  env: 'production',
  locale: 'en-US',
  dbType: 'cf'
})
