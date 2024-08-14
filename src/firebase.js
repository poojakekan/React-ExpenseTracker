// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlAoOnmqqPlhqbTGuShBWDG05LtBOx9qI",
  authDomain: "expense-tracker-cf43e.firebaseapp.com",
  projectId: "expense-tracker-cf43e",
  storageBucket: "expense-tracker-cf43e.appspot.com",
  messagingSenderId: "899044815107",
  appId: "1:899044815107:web:a2a2c2c354cdbc715a7936",
  measurementId: "G-LERJF17GLK",
  databaseURL: "https://expense-tracker-cf43e-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
