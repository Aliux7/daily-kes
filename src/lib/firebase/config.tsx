import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore }  from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfML0w_PBbAQZKNEvPVkpo5HvjZfbcX8o",
  authDomain: "daily-kes.firebaseapp.com",
  projectId: "daily-kes",
  storageBucket: "daily-kes.appspot.com",
  messagingSenderId: "764720111266",
  appId: "1:764720111266:web:636432416697e33a1881fb",
  measurementId: "G-X8D3P547VJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export {auth, fireStore, storage}