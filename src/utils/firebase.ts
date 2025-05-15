// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFNpWMDgFcZIuuSHlMj9bvtkRZxCriWa8",
  authDomain: "netflixgpt-bb129.firebaseapp.com",
  projectId: "netflixgpt-bb129",
  storageBucket: "netflixgpt-bb129.firebasestorage.app",
  messagingSenderId: "549352717523",
  appId: "1:549352717523:web:4f2989ea64299168ee6826",
  measurementId: "G-09Z55BVJCM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytijcs = getAnalytics(app);
export const auth = getAuth();
