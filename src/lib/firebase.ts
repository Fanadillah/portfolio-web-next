// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// interface firebaseConfig {
//     apiKey: string;
//     authDomain: string;
//     projectId: string;
//     storageBucket: string;
//     messagingSenderId: string;
//     appId: string;
// }

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "portofolio-web-32b43.firebaseapp.com",
  projectId: "portofolio-web-32b43",
  storageBucket: "portofolio-web-32b43.firebasestorage.app",
  messagingSenderId: "488190628193",
  appId: "1:488190628193:web:aabde7f2bd0ee459aab520"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export default app;