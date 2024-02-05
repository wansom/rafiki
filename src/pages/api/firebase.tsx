import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrQudI-0Iu6d8DDPj6q2ft_C4hb7TKmbY",
  authDomain: "culturelyft-81292.firebaseapp.com",
  projectId: "culturelyft-81292",
  storageBucket: "culturelyft-81292.appspot.com",
  messagingSenderId: "394178844455",
  appId: "1:394178844455:web:f9dc674db3696aa8897b02",
  measurementId: "G-F222Z01N2Z"
};

const app=initializeApp(firebaseConfig)

export const firestoreDb = getFirestore(app)
export const realtimeDb = getDatabase(app)
export const storage = getStorage(app)
export const auth =getAuth(app)
