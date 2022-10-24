import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCbo8ZBL9l6R6LqQ0iIURyXth5T8160Mk8",
  authDomain: "rmall-67400.firebaseapp.com",
  projectId: "rmall-67400",
  storageBucket: "rmall-67400.appspot.com",
  messagingSenderId: "628665036613",
  appId: "1:628665036613:web:c5720392cab040f1e3582c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
