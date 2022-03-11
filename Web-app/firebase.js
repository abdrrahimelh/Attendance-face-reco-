import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDb03Fwv-YQPUDt3utKhXY3GY0LwDqyg_k",
  authDomain: "disney-555e2.firebaseapp.com",
  projectId: "disney-555e2",
  storageBucket: "disney-555e2.appspot.com",
  messagingSenderId: "611934706126",
  appId: "1:611934706126:web:79b50c52bcac81c612f39f",
  measurementId: "G-5NP1RM54YP"
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
