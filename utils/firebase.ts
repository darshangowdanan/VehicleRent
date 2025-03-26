import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCRDXcwvOyMN7po1AbEgiySTpqEzIeQzxw",
    authDomain: "rentwheel-49833.firebaseapp.com",
    projectId: "rentwheel-49833",
    storageBucket: "rentwheel-49833.firebasestorage.app",
    messagingSenderId: "723286196760",
    appId: "1:723286196760:web:38af1171de7b3972fbb96d",
    measurementId: "G-F4ZPDZ2QCB"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc };
