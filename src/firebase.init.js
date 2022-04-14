// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhK5OdVbPHq40JDWgmoKR_0BuIhMjQ8dM",
  authDomain: "genius-car-service-2.firebaseapp.com",
  projectId: "genius-car-service-2",
  storageBucket: "genius-car-service-2.appspot.com",
  messagingSenderId: "652515337693",
  appId: "1:652515337693:web:cb84e938161ab4f905c234",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
