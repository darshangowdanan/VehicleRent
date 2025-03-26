import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCRDXcwvOyMN7po1AbEgiySTpqEzIeQzxw",
  authDomain: "rentwheel-49833.firebaseapp.com",
  projectId: "rentwheel-49833",
  storageBucket: "rentwheel-49833.appspot.com",
  messagingSenderId: "723286196760",
  appId: "1:723286196760:web:38af1171de7b3972fbb96d",
  measurementId: "G-F4ZPDZ2QCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

export { auth, db }; // ✅ Export Firestore

