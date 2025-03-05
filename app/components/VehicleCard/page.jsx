'use client'
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

export function VehicleCard({ vehicle }) {
  const router = useRouter();

  return (
    <div
      className="card overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-lg rounded-2xl bg-white"
      onClick={() => router.push(`/vehicle-details?id=${vehicle.id}`)}
    >
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
          <span className="text-blue-600 font-semibold text-lg">
          ₹{vehicle.price}/day
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-2 bg-gray-200 px-2 py-1 rounded-lg">{vehicle.type}</span>
          <span className="bg-gray-200 px-2 py-1 rounded-lg">{vehicle.location}</span>
        </div>
        <p className="text-sm text-gray-700 line-clamp-2">{vehicle.description}</p>
        <div className="mt-3">
          <span
            className={`text-sm font-semibold ${
              vehicle.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {vehicle.available ? "Available" : "Currently Rented"}
          </span>
        </div>
      </div>
    </div>
  );
}

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

