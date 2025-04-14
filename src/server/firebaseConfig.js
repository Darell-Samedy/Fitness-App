import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration ORIGINAL
const firebaseConfig = {
  apiKey: "AIzaSyDaTXL5awGMLomU5P7f2C6fwHiL-bf9RLw",
  authDomain: "fitness-app-7aa7b.firebaseapp.com",
  projectId: "fitness-app-7aa7b",
  storageBucket: "fitness-app-7aa7b.appspot.com",
  messagingSenderId: "655915248603",
  appId: "1:655915248603:web:cc4a2365d45e0e5f4695fe",
  measurementId: "G-3FS0EBFW68"
};

// Your web app's Firebase configuration TEST
// const firebaseConfig = {
//   apiKey: "AIzaSyDMeARNL6isW5OyALSiMi2PhxmPi-QwtUc",
//   authDomain: "workoutapp-test-15d89.firebaseapp.com",
//   projectId: "workoutapp-test-15d89",
//   storageBucket: "workoutapp-test-15d89.firebasestorage.app",
//   messagingSenderId: "59928705570",
//   appId: "1:59928705570:web:cf8653a0d6da99ad51687b",
//   measurementId: "G-8PYPZ6XVME"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db };