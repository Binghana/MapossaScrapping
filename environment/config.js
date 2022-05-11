// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {browserLocalPersistence, initializeAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArjo7NVj5kM2zEo9vIg6DzkU1ToZ9WQBM",
  authDomain: "mapossadatatech.firebaseapp.com",
  projectId: "mapossadatatech",
  storageBucket: "mapossadatatech.appspot.com",
  messagingSenderId: "462737693135",
  appId: "1:462737693135:web:02a9592a29f9845fa45aba",
  measurementId: "G-Q2B6WQWR48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = initializeAuth(app,{persistence : browserLocalPersistence})
export const db = getFirestore(app);

