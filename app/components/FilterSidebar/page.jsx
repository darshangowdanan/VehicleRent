"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "../../../utils/store";

export function FilterSidebar() {
  const { filters, setFilters } = useStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const locations = ["Delhi", "Mumbai", "Bangalore","Kolkata","Chennai"];

  // Sync Zustand state with URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setFilters({
      type: params.get("type") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      location: params.get("location") || "",
      showAvailableOnly: params.get("showAvailableOnly") === "true",
    });
  }, [searchParams, setFilters]);

  // Handle filter changes and update URL query parameters
  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(window.location.search);
  
    if (!value || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  
    setFilters((prev) => ({ ...prev, [key]: value })); // Update Zustand state
    router.replace(`?${params.toString()}`, { scroll: false }); // Replace URL without navigation
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
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
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
              min={0}
              className="w-full rounded-lg border-gray-200 p-2.5"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value || null)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              min={1}
              className="w-full rounded-lg border-gray-200 p-2.5"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value || null)}
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
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
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
            onChange={(e) => handleFilterChange("showAvailableOnly", e.target.checked ? "true" : "")}
          />
          <label htmlFor="available" className="ml-2 text-sm text-gray-700">
            Show available only
          </label>
        </div>
      </div>
    </div>
  );
}
