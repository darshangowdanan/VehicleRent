"use client";

import React, { useState } from "react";
import { useStore } from "../../../utils/store";

export function FilterSidebar() {
  const { filters, setFilters } = useStore();
  const locations = ["Downtown", "Airport", "City Center"];

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
  };

  return (
    <div className="card p-4 sticky top-20 rounded-3xl bg-slate-300">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        {/* Vehicle Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            className="w-full rounded-lg border-gray-200 p-2.5"
            value={filters.type || ""}
            onChange={(e) => handleFilterChange("type", e.target.value || null)}
          >
            <option value="">All Types</option>
            <option value="2-wheel">2 Wheel</option>
            <option value="4-wheel">4 Wheel</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border-gray-200 p-2.5"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : null)
              }
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full rounded-lg border-gray-200 p-2.5"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            className="w-full rounded-lg border-gray-200 p-2.5"
            value={filters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value || null)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="available"
            className="rounded border-gray-200"
            checked={filters.showAvailableOnly}
            onChange={(e) => handleFilterChange("showAvailableOnly", e.target.checked)}
          />
          <label htmlFor="available" className="ml-2 text-sm text-gray-700">
            Show available only
          </label>
        </div>
      </div>
    </div>
  );
}

export function VehicleList({ vehicles }) {
  const [page, setPage] = useState(1);
  const vehiclesPerPage = 6;
  const startIndex = (page - 1) * vehiclesPerPage;
  const displayedVehicles = vehicles.slice(startIndex, startIndex + vehiclesPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayedVehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 border rounded-lg bg-white shadow">
            <h3 className="text-lg font-semibold">{vehicle.name}</h3>
            <p>Type: {vehicle.type}</p>
            <p>Price: ${vehicle.price}</p>
            <p>Location: {vehicle.location}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={startIndex + vehiclesPerPage >= vehicles.length}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
