'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);

    // Store form data in localStorage
    localStorage.setItem('userFormData', JSON.stringify(data));

    // Show success message
    setSubmitted(true);

    // Delay for 2 seconds, then navigate to home page
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Registration</h2>

        {submitted ? (
          <p className="text-green-600 text-center font-medium">✅ Form submitted successfully! Redirecting...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">Name:</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm">⚠ {errors.name.message}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-700 font-medium">Age:</label>
              <input
                type="number"
                {...register('age', { required: 'Age is required', min: { value: 18, message: 'Must be 18 or older' } })}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-red-500 text-sm">⚠ {errors.age.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email format' } })}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">⚠ {errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium">Phone:</label>
              <input
                type="text"
                {...register('phone', { required: 'Phone is required', pattern: { value: /^\d{10}$/, message: 'Must be a 10-digit number' } })}
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm">⚠ {errors.phone.message}</p>}
            </div>

            {/* Role (Radio Buttons) */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Role:</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="customer" {...register('role', { required: 'Please select a role' })} className="mr-2" />
                  Customer
                </label>
                <label className="flex items-center">
                  <input type="radio" value="owner" {...register('role', { required: 'Please select a role' })} className="mr-2" />
                  Vehicle Owner
                </label>
              </div>
              {errors.role && <p className="text-red-500 text-sm">⚠ {errors.role.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
