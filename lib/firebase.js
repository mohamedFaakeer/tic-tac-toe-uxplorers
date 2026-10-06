import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAn6xc6624rJvsCqqu9KGgaNm6C2s6o0qw",
  authDomain: "tic-tac-toe-uxplorers.firebaseapp.com",
  projectId: "tic-tac-toe-uxplorers",
  storageBucket: "tic-tac-toe-uxplorers.firebasestorage.app",
  messagingSenderId: "726677813927",
  appId: "1:726677813927:web:2390b6d1b63ffc81bc3982",
  measurementId: "G-MQ5PJHY0GJ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
