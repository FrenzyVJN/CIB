// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3KZQOAaG53YbeLiHZctGn_h5HVpjEI7o",
  authDomain: "campusinternshipbuddy.firebaseapp.com",
  projectId: "campusinternshipbuddy",
  storageBucket: "campusinternshipbuddy.appspot.com",
  messagingSenderId: "949270897181",
  appId: "1:949270897181:web:dfdd4dd9be8dc65f569cf4",
  measurementId: "G-QF854C1K9L",
  databaseURL: "https://campusinternshipbuddy-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = getDatabase(app); //use it
// const analytics = getAnalytics(app);
export default app;