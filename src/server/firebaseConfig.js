import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaTXL5awGMLomU5P7f2C6fwHiL-bf9RLw",
  authDomain: "fitness-app-7aa7b.firebaseapp.com",
  projectId: "fitness-app-7aa7b",
  storageBucket: "fitness-app-7aa7b.appspot.com",
  messagingSenderId: "655915248603",
  appId: "1:655915248603:web:cc4a2365d45e0e5f4695fe",
  measurementId: "G-3FS0EBFW68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db };