// src/utils/firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFNpWMDgFcZIuuSHlMj9bvtkRZxCriWa8",
  authDomain: "netflixgpt-bb129.firebaseapp.com",
  projectId: "netflixgpt-bb129",
  storageBucket: "netflixgpt-bb129.firebasestorage.app",
  messagingSenderId: "549352717523",
  appId: "1:549352717523:web:4f2989ea64299168ee6826",
  measurementId: "G-09Z55BVJCM",
};

const app = initializeApp(firebaseConfig);

// Only initialize analytics in the browser
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
