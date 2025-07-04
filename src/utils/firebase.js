// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY82vyjLxIlHj5AhWkfyMlp8NqFVsP7YU",
  authDomain: "netflixgpt-9189e.firebaseapp.com",
  projectId: "netflixgpt-9189e",
  storageBucket: "netflixgpt-9189e.firebasestorage.app",
  messagingSenderId: "22712358058",
  appId: "1:22712358058:web:4afad189d6519f9f496cd3",
  measurementId: "G-X5225WK0XQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();