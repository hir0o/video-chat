// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBo3WIXliQUMca5ZePYOXsFT_jP7711NZg',
  authDomain: 'zatsudan-63cd4.firebaseapp.com',
  projectId: 'zatsudan-63cd4',
  storageBucket: 'zatsudan-63cd4.appspot.com',
  messagingSenderId: '163286298155',
  appId: '1:163286298155:web:a2cc6dcdd81e2dd07f446e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Google Auth
export const provider = new GoogleAuthProvider()

const auth = getAuth()