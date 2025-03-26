"use client";
import { useState, useEffect } from "react";
// import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
// import { Roboto } from 'next/font/google';
import Link from "next/link";


export function Main() {
  const [location, setLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [minDate, setMinDate] = useState("");
  
  useEffect(() => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    setMinDate(
      today.toISOString().slice(0, 10) +
        `T${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`
    );
  }, []);
  const handlePickupDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setPickupDate(e.target.value);

    const returnDate = new Date(selectedDate);
    returnDate.setDate(returnDate.getDate() + 1);
    setReturnDate(returnDate.toISOString().slice(0, 16));
  };

  return (
    <div className="w-full h-[100vh] md:h-[80vh] flex md:items-center justify-center bg-gray-100 md:bg-transparent overflow-hidden pt-4 md:pt-0">
      <div className="relative flex flex-col md:flex-row md:justify-between w-[90vw] md:w-[95vw] h-[90%] bg-white rounded-xl shadow-md overflow-hidden">
        {/* Left Section (Text) */}
        <div className="w-full md:w-1/2 flex items-start justify-center p-4">
          <div className="ext-center md:text-left text-lg md:text-xl font-bold max-w-[90%] md:mt-40">
            ACCOMPANY YOUR JOURNEY WITH COMFORT
            <div className="mt-5">
              <Button className="mr-11" variant="outlined" onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }>Know More</Button>
              <Button variant="outlined" onClick={() => window.location.href = "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"} >
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            className="w-full max-w-6xl md:max-w-6xl object-contain"
            src="/car (2).png"
            alt="car"
          />
        </div>

        {/* Bottom Section (Form) */}
        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center md:justify-start">
          <form className="md:w-[50vw] flex flex-wrap items-center justify-center space-y-4 md:space-y-0 md:flex-row md:space-x-4 p-4 bg-blue-300 rounded-xl shadow-md">
            {/* Vehicle Type Select */}
            <div className="flex flex-col w-full md:w-48">
              <label className="text-sm md:text-base text-muted-foreground">
                Vehicle Type
              </label>
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </div>

            {/* Pickup Date */}
            <div className="flex flex-col w-full md:w-48">
              <label className="text-sm md:text-base text-muted-foreground">
                Pick Up
              </label>
              <input
                type="datetime-local"
                value={pickupDate}
                onChange={handlePickupDateChange}
                min={minDate}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Return Date */}
            <div className="flex flex-col w-full md:w-48">
              <label className="text-sm md:text-base text-muted-foreground">
                Return
              </label>
              <input
                type="datetime-local"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={pickupDate}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Submit Button */}
            <Link href="#vehicle">
            <button
              type="submit"
              className="bg-primary text-white rounded-lg p-2 w-full md:w-auto text-sm md:text-base"
            >
              Search
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
