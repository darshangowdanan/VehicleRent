const { db, collection, addDoc } = require("./firebase");
import { mockVehicles } from "./store.ts"; // Import mock data

const uploadVehicles = async () => {
  const vehiclesRef = collection(db, "vehicles"); // Firestore collection
  for (const vehicle of mockVehicles) {
    await addDoc(vehiclesRef, vehicle);
  }
  console.log("🚀 Vehicles uploaded to Firestore!");
};

// Run this function **only ONCE** to store initial data.
uploadVehicles();
