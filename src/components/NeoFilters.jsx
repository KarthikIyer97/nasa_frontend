

import React, { useState } from "react";

const NeoFilters = ({ onFilterChange, fetchAsteroids }) => {
  const [activeTab, setActiveTab] = useState("dates"); // Default to "Asteroids Filtration on Selected Dates"
  const [startDate, setStartDate] = useState(""); // ✅ Make Start Date Selectable
  const [endDate, setEndDate] = useState(""); // ✅ Make End Date Selectable
  const [nearestApproachDate, setNearestApproachDate] = useState("");
  const [isPotentiallyHazardous, setIsPotentiallyHazardous] = useState(false);

  const handleClosestApproachFilter = (e) => {
    e.preventDefault();
    onFilterChange({ hazardous: false }, nearestApproachDate); // Apply only the date filter
  };

  const handleHazardousFilter = (e) => {
    e.preventDefault();
    onFilterChange({ hazardous: true }, null); // Show all hazardous asteroids within selected dates
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-4 w-full max-w-5xl mx-auto">
      
      {/* Header (Dark Blue) */}
      <div className="bg-blue-900 text-white text-lg font-bold px-4 py-2 rounded-t-lg text-center">
        🌠 Asteroids Filtration
      </div>

      {/* Tab Section */}
      <div className="flex border-b border-gray-700 bg-gray-800 p-2 rounded-t-lg">
        <button 
          className={`flex-1 text-center p-2 font-semibold ${
            activeTab === "dates" ? "bg-blue-700 text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("dates")}
        >
          Asteroids Filtration on Selected Dates
        </button>
        <button 
          className={`flex-1 text-center p-2 font-semibold ${
            activeTab === "closest" ? "bg-blue-700 text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("closest")}
        >
          Filter on Closest Approach Date
        </button>
        <button 
          className={`flex-1 text-center p-2 font-semibold ${
            activeTab === "hazardous" ? "bg-blue-700 text-white" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("hazardous")}
        >
          Hazardous
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800 p-4 rounded-b-lg shadow-md">
        
        {/* Tab 1: Asteroids Filtration on Selected Dates */}
        {activeTab === "dates" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Start Date & End Date in the Same Line (With Calendar Picker) */}
            <div className="bg-gray-700 p-2 rounded-lg flex items-center justify-between w-full">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-600 text-white border border-gray-500 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-600 text-white border border-gray-500 p-2 rounded w-full"
                />
              </div>
            </div>

            <div className="col-span-2 flex justify-center items-center">
              <button
                onClick={() => fetchAsteroids(startDate, endDate)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
              >
                🚀 Fetch Asteroids
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Filter on Closest Approach Date */}
        {activeTab === "closest" && (
          <form onSubmit={handleClosestApproachFilter} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="bg-gray-700 p-2 rounded-lg">
              <h3 className="text-md font-semibold mb-2">🌍 Select Closest Approach Date</h3>
              <input
                type="date"
                value={nearestApproachDate}
                onChange={(e) => setNearestApproachDate(e.target.value)}
                className="bg-gray-600 text-white border border-gray-500 p-2 rounded w-full"
                min={startDate}
                max={endDate}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
              >
                🔍 Apply Filter
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Hazardous Filter */}
        {activeTab === "hazardous" && (
          <form onSubmit={handleHazardousFilter} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="bg-gray-700 p-2 rounded-lg flex flex-col justify-between">
              <h3 className="text-md font-semibold mb-2">☄️ Show Only Hazardous Asteroids</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPotentiallyHazardous}
                  onChange={(e) => setIsPotentiallyHazardous(e.target.checked)}
                  className="w-5 h-5 bg-gray-600 border border-gray-500 rounded-md"
                />
                <span className="text-white">Enable Filtering</span>
              </label>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
              >
                🔍 Apply Filter
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default NeoFilters;
