
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY, 
  authDomain: process.env.FIREBASE_AUTHDOMAIN, 
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID, 
  measurementId: process.env.FIREBASE_MEASUREMENTID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore_db = getFirestore(app)
export const auth = getAuth(app)