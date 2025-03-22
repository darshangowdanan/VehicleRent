"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VehicleCard } from "../VehicleCard/page";
import { FilterSidebar } from "../FilterSidebar/page";
import { useStore } from "../../../utils/store"; // Zustand store
import { SlidersHorizontal, X } from "lucide-react";

export default function Mainv() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { vehicles, filters, setFilters } = useStore(); // Ensure vehicles & filters exist
  const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync Zustand filters with URL parameters on load
  useEffect(() => {
    setFilters({
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      location: searchParams.get("location") || "",
      showAvailableOnly: searchParams.get("showAvailableOnly") === "true",
    });
  }, [searchParams, setFilters]);

  // Apply filtering based on Zustand filters
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
      {/* Mobile Filter Dialog */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 lg:hidden ${
          isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileFiltersOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-4/5 max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
            isMobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <FilterSidebar />
        </div>
      </div>

      <div className="lg:flex gap-8 w-full">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white shadow-lg rounded-xl p-5 sticky top-24 ml-2">
            <FilterSidebar />
          </div>
        </div>

        <div className="flex-grow">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Available Vehicles</h1>
            <button
              className="lg:hidden flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" /> Filters
            </button>
          </div>

          {/* Vehicle Grid */}
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
