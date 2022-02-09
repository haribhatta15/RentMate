import * as firebase from 'firebase/compat';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/storage';
export const firebaseConfig = {
  apiKey: 'AIzaSyDgzhh8zsNwr1kXtZpankhADXFedRbtdIQ',
  authDomain: 'rent-mate-91f5c.firebaseapp.com',
  databaseURL: 'https://rent-mate-91f5c-default-rtdb.firebaseio.com',
  projectId: 'rent-mate-91f5c',
  storageBucket: 'rent-mate-91f5c.appspot.com',
  messagingSenderId: '847113981916',
  appId: '1:847113981916:web:b3f08bc14d7146c41a0919',
  measurementId: 'G-WW0SF1YHNP',
};
let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export const db = getFirestore(app);
export const dbR = getDatabase(app);
export const auth = getAuth(app);
export function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password);
}
export { firebase };
