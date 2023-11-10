import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVaFGsSUiA1XsA-86wshhJwbmuP0hEN3w",
  authDomain: "filmy-6723d.firebaseapp.com",
  projectId: "filmy-6723d",
  storageBucket: "filmy-6723d.appspot.com",
  messagingSenderId: "758117185000",
  appId: "1:758117185000:web:dd71d572ede8f1ff6d605d"
};

const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app)
export const  moviesRef = collection(db, 'movies')
export const  reviewsRef = collection(db, 'reviews')
export const usersRef = collection(db, "users");

export default app