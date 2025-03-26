"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VehicleCard } from "../VehicleCard/page";
import { FilterSidebar } from "../FilterSidebar/page";
import { useStore } from "../../../utils/store";
import { SlidersHorizontal, X } from "lucide-react";

function MainComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { vehicles, filters, setFilters } = useStore();
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      location: searchParams.get("location") || "",
      showAvailableOnly: searchParams.get("showAvailableOnly") === "true",
    });
  }, [searchParams, setFilters]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filters.type && vehicle.type !== filters.type) return false;

    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Infinity;
    if (vehicle.price < minPrice || vehicle.price > maxPrice) return false;

    if (filters.location && vehicle.location !== filters.location) return false;

    if (filters.showAvailableOnly && !vehicle.available) return false;

    return true;
  });

  return (
    <div className="flex-grow container mx-auto mt-5 px-4 py-8" id="vehicle">
      <div className="lg:flex gap-8 w-full">
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white shadow-lg rounded-xl p-5 sticky top-24 ml-2">
            <FilterSidebar />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Available Vehicles</h1>
            <button
              className="lg:hidden flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">No vehicles available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense
export default function Mainv() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainComponent />
    </Suspense>
  );
}

