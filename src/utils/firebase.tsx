import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_CONFIG_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_CONFIG_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_CONFIG_APP_ID
}

console.log(JSON.stringify(firebaseConfig, null, 2))

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
