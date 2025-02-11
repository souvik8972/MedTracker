import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0DgFgWbU7VJ_cAd77Yjky6mW6-IecXjw",
  authDomain: "medtrack-81ad0.firebaseapp.com",
  projectId: "medtrack-81ad0",
  storageBucket: "medtrack-81ad0.firebasestorage.app",
  messagingSenderId: "570307166133",
  appId: "1:570307166133:web:ba9276b8e9e6e23e0ea3fc",
  measurementId: "G-BXGT1797J6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable persistent authentication using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const db = getFirestore(app);
