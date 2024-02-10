// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-cf2fb.firebaseapp.com",
  projectId: "realestate-cf2fb",
  storageBucket: "realestate-cf2fb.appspot.com",
  messagingSenderId: "609829988935",
  appId: "1:609829988935:web:1743e2ccfe34055f211f62",
  measurementId: "G-0SCW0B0PFP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);