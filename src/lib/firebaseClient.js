"use client";

import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBG_Y42xhTGRvMiWaWDooAGYtTuvXYmKG4",
    authDomain: "yafim-a6045.firebaseapp.com",
    projectId: "yafim-a6045",
    storageBucket: "yafim-a6045.appspot.com",
    messagingSenderId: "302972980349",
    appId: "1:302972980349:web:d03dba51cc93ac38927514",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;


