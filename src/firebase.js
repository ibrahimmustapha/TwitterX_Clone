import { initializeApp } from "firebase/app";
import "firebase/auth"; // Import other services you plan to use
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPkBD6Uw2SbN5RjFk1im5KISKq3295zPM",
  authDomain: "twitterx-clone-7410c.firebaseapp.com",
  projectId: "twitterx-clone-7410c",
  storageBucket: "twitterx-clone-7410c.appspot.com",
  messagingSenderId: "481737700617",
  appId: "1:481737700617:web:ef2f8ffd2904c71ef10fd8",
  measurementId: "G-XWB6458DWB",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const storage = getStorage(firebaseApp);

export {
  auth,
  googleProvider,
  githubProvider,
  db,
  firebaseApp,
  storage,
};
