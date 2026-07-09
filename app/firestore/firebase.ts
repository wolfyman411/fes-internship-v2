import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAb0B0dDNmhdJL8LZNQYIt1oOeVQLd4SEg",
  authDomain: "summarist-internship-eli.firebaseapp.com",
  projectId: "summarist-internship-eli",
  storageBucket: "summarist-internship-eli.firebasestorage.app",
  messagingSenderId: "865803191081",
  appId: "1:865803191081:web:5d039834e8d9607dc22d38"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()