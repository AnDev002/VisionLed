// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8vPzuigjCR5lqkokqfrbxDIAz_6i73Q4",
  authDomain: "tamanhled-87682.firebaseapp.com",
  projectId: "tamanhled-87682",
  storageBucket: "tamanhled-87682.appspot.com",
  messagingSenderId: "996497192844",
  appId: "1:996497192844:web:5d14acfa6c457779b048a9",
  measurementId: "G-QXB27F9SKT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);