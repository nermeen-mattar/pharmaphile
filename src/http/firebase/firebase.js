import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb9e1MuOjjajMWEZyPtnMlETF_hf9MY9A",
  authDomain: "pharmaphile-dca83.firebaseapp.com",
  databaseURL: "https://pharmaphile-dca83.firebaseio.com",
  projectId: "pharmaphile-dca83",
  storageBucket: "pharmaphile-dca83.appspot.com",
  messagingSenderId: "757542575834",
  appId: "1:757542575834:web:c8f0cd55ab1bca315f8fe3",
  measurementId: "G-GGRPL5V9PR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const pharmaciesCollection = db.collection('pharmacies')
const reviewsCollection = db.collection('reviews')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  pharmaciesCollection,
  reviewsCollection
}
