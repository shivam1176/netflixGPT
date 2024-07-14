// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5g5V-sideghxV2TpTTKCBf8kbCPLYjok",
  authDomain: "netflixgpt-b38ac.firebaseapp.com",
  projectId: "netflixgpt-b38ac",
  storageBucket: "netflixgpt-b38ac.appspot.com",
  messagingSenderId: "349357422058",
  appId: "1:349357422058:web:e5f04b27e2f18776adae93",
  measurementId: "G-NFZX9G1WP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();