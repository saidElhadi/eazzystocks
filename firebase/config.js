
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN, 
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID, 
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(app)
export const auth = getAuth(app)