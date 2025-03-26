"use client";
import React from "react";

export default function AboutUs() {
  return (
    <section id="about" className="bg-transparent py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-600">About RentWheel</h2>
        <p className="mt-4 text-gray-700 text-lg">
          RentWheel is Bangalore’s premier vehicle rental service, offering a
          seamless and affordable way to explore the city. Whether you need a
          car for a road trip, a bike for daily commuting, or a luxury ride for
          a special occasion, we have you covered.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-orange-400">
              Wide Range of Vehicles
            </h3>
            <p className="text-gray-600 mt-2">
              Choose from a variety of cars, bikes, and SUVs at competitive
              rates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-orange-400">
              Flexible Rental Plans
            </h3>
            <p className="text-gray-600 mt-2">
              Hourly, daily, and long-term rentals to suit your needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-orange-400">
              24/7 Support
            </h3>
            <p className="text-gray-600 mt-2">
              Our team is always available to assist you with your booking.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-gray-700 text-lg">
            Experience hassle-free rentals with **RentWheel** and hit the road
            with confidence.
          </p>
          <button
            className="mt-6 bg-orange-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
            onClick={() =>
              document
                .getElementById("vehicle")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book Your Ride
          </button>
        </div>
      </div>
    </section>
  );
}
