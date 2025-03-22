"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car, Bike, AlignRight, X } from "lucide-react";

const locations = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Pune",
  "Hyderabad",
];
export function Navbar() {
  const router = useRouter();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [userName, setUserName] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
      setProfileImg(parsedUser.profileImg); // Add profileImg to localStorage when user logs in
    }
  }, []);

  // const handleLocationChange = (e) => setLocation(e.target.value);
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    // Filter locations based on input
    if (value.trim() === "") {
      setFilteredLocations([]);
    } else {
      const filtered = locations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  const handleSelectLocation = (loc) => {
    setLocation(loc); // Set selected location
    setFilteredLocations([]); // Hide suggestions
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Search Bar */}
          <div className="flex items-center justify-between">
            <div className="relative flex items-center mt- ml-4">
              <input
                type="text"
                placeholder="Search location"
                value={location}
                onChange={handleLocationChange}
                className="p-2 rounded-lg text-black w-full md:w-64 mr-2 pl-10 border border-black"
              />
              <div className="absolute left-2 text-gray-500">📍</div>
              {/* Search Icon (Right) */}
              <div className="absolute right-2 text-gray-500 cursor-pointer">
                <Search className="w-5 h-5 mr-2" />
              </div>
              {/* Suggestions Dropdown */}
              {filteredLocations.length > 0 && (
                <ul className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg w-full md:w-64 shadow-lg z-10">
                  {filteredLocations.map((loc) => (
                    <li
                      key={loc}
                      onClick={() => handleSelectLocation(loc)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex space-x-6 md:ml-5">
              <Link href="#vehicle" className="hover:text-gray-300">
                Vehicle
              </Link>
              <Link href="#about" className="hover:text-gray-300">
                About Us
              </Link>
              <Link href="#footer" className="hover:text-gray-300">
                Contact
              </Link>
            </div>

            {/* Profile / Sign In - Desktop */}
            <div className="hidden md:block md:ml-4">
              {userName ? (
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => router.push("/profile")}
                >
                  {profileImg ? (
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold uppercase">
                      {getInitial(userName)}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="btn btn-primary hidden md:block"
                  onClick={() => router.push("/SignUp")}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <AlignRight />
          </button>
        </div>
      </div>

      {/* Sidebar Drawer for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="bg-white w-64 h-full p-5 shadow-lg absolute top-0 right-0"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside sidebar from closing it
        >
          {/* Close Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-3 mb-6">
            {profileImg ? (
              <img
                src={profileImg}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold uppercase">
                {getInitial(userName)}
              </div>
            )}
            <span className="text-lg font-medium">{userName || "Guest"}</span>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <Link
              href="#vehicle"
              className="block text-gray-800 hover:text-primary-500"
            >
              Vehicle
            </Link>
            <Link
              href="#about"
              className="block text-gray-800 hover:text-primary-500"
            >
              About Us
            </Link>
            <Link
              href="#footer"
              className="block text-gray-800 hover:text-primary-500"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
