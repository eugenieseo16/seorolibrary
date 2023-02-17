// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBukI7C3lE0oXU9K1dzKwCoTTF8lEyRNnI',
  authDomain: 'ssafy-acbc2.firebaseapp.com',
  projectId: 'ssafy-acbc2',
  storageBucket: 'ssafy-acbc2.appspot.com',
  messagingSenderId: '144357564995',
  appId: '1:144357564995:web:2f8b1994d1f33a54dd2af6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
export const firebaseAuth = getAuth(app);
