"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { useStore } from "../utils/store";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

export default function VehicleDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { vehicles } = useStore();

  const vehicleId = searchParams.get("id");
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Vehicle not found</h1>
            <button
              onClick={() => router.push("/")}
              className="btn btn-primary inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to listings
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/")}
          className="mb-6 text-gray-600 hover:text-gray-900 inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to listings
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{vehicle.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                {vehicle.location}
              </div>
              <p className="text-gray-600">{vehicle.description}</p>
            </div>

            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">${vehicle.price}</span>
                <span className="text-gray-600">per day</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Availability</span>
                  </div>
                  <span
                    className={`font-medium ${
                      vehicle.available
                        ? "text-secondary-600"
                        : "text-red-500"
                    }`}
                  >
                    {vehicle.available ? "Available now" : "Currently rented"}
                  </span>
                </div>

                <button
                  className={`w-full btn ${
                    vehicle.available ? "btn-primary" : "btn-secondary opacity-50"
                  }`}
                  disabled={!vehicle.available}
                >
                  {vehicle.available ? "Rent Now" : "Not Available"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
