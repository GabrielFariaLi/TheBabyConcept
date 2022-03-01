// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2F_wPqFAj-GAAE8cviyGfddE3kSCVHnI",
  authDomain: "baby-concept20.firebaseapp.com",
  projectId: "baby-concept20",
  storageBucket: "baby-concept20.appspot.com",
  messagingSenderId: "991399736617",
  appId: "1:991399736617:web:03680c3eff55eed9967338",
  measurementId: "G-1E4TKQD6R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;