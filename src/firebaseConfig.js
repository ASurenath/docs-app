// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALv3XCnZ5Bo5A5WwbPvUx8qUCiVnHVtGM",
  authDomain: "docs-app-88415.firebaseapp.com",
  projectId: "docs-app-88415",
  storageBucket: "docs-app-88415.appspot.com",
  messagingSenderId: "146805876253",
  appId: "1:146805876253:web:32bde00a3e2a305c9988f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
