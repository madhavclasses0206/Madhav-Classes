// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFEzgIjon9HWPA3HH25kvGHQVhpHEY72k",
  authDomain: "madhav-class.firebaseapp.com",
  projectId: "madhav-class",
  storageBucket: "madhav-class.firebasestorage.app",
  messagingSenderId: "750047640585",
  appId: "1:750047640585:web:879ba4b5ffc4097e430cd8",
  measurementId: "G-PC91F2PNJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Export Database
export { db };