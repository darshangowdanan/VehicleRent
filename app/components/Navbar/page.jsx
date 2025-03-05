"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Bike,AlignRight } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-primary-600" />
              <Bike className="h-6 w-6 text-secondary-600 hidden md:block" />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">
              RentWheels
            </span>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center mt- ml-4">
              <input
                type="text"
                placeholder="Search location"
                value={location}
                onChange={handleLocationChange}
                className="p-2 rounded-lg text-black w-full md:w-64 mr-2 pl-10 border border-black"
              />
              <div className="absolute left-2 text-gray-500">📍</div>
            </div>
            <div className="hidden md:flex space-x-6 ">
              <Link href="#vehicle" className="hover:text-gray-300" >
                Vehicle
              </Link>
              <Link href="#about" className="hover:text-gray-300">
                About Us
              </Link>
              <Link href="#footer" className="hover:text-gray-300">
                Contact
              </Link>
            </div>
            <AlignRight className="md:hidden"/>
            <button
              className="btn btn-primary hidden md:block "
              onClick={() => router.push("/SignUp")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
