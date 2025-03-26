"use client";
import { useStore } from "../../../utils/store"; // Adjust path if needed
import { useParams } from "next/navigation";

export default function VehicleDetails() {
  const { id } = useParams(); // Get ID from URL
  const vehicle = useStore((state) => state.vehicles.find((v) => v.id === id));

  if (!vehicle) {
    return <p className="text-center text-red-500 text-lg font-semibold mt-10">🚨 Vehicle not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      {/* Vehicle Image */}
      <div className="relative w-full max-h-[350px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <span
          className={`absolute top-4 right-4 px-4 py-2 text-sm font-semibold rounded-full shadow-md ${
            vehicle.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {vehicle.available ? "Available" : "Currently Rented"}
        </span>
      </div>

      {/* Vehicle Info */}
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{vehicle.name}</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-lg">{vehicle.description}</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
            {vehicle.type.toUpperCase()}
          </span>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
            📍 {vehicle.location}
          </span>
        </div>

        {/* Pricing & Button */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <p className="text-lg sm:text-xl font-semibold text-gray-800">
            💰 ₹{vehicle.price}/day
          </p>
          <button className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition">
            🚗 Book Your Ride
          </button>
        </div>
      </div>
    </div>
  );
}
