import React from 'react';
import './App.css';
import './tailwind.css';

function FitnessDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold">Fitness Tracker Dashboard</h1>
      </header>

      {/* Main Dashboard */}
      <main className="mt-6 space-y-6">
        {/* Workouts Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Workouts</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Running</span>
              <span className="text-gray-600">5 km</span>
            </li>
            <li className="flex justify-between">
              <span>Strength Training</span>
              <span className="text-gray-600">45 mins</span>
            </li>
          </ul>
        </div>

        {/* Calories Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">Calories Burned</h2>
          <div className="text-center">
            <p className="text-4xl font-bold text-red-500">1,200 kcal</p>
            <p className="text-gray-600 mt-2">Goal: 2,000 kcal</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-green-600">Progress</h2>
          <p className="text-gray-600">Weekly Goal: 5 Workouts</p>
          <div className="bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: "60%" }} // Update dynamically based on progress
            ></div>
          </div>
          <p className="text-right text-gray-500 mt-1">3/5 completed</p>
        </div>

        {/* Video Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-600">Workout Video</h2>
          <video controls className="w-full rounded-lg shadow-md">
          <source src={`${process.env.PUBLIC_URL}/Dumbbell Bench Press.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </main>
    </div>
  );
}

export default FitnessDashboard;