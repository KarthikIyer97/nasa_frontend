
import React, { useEffect, useState } from "react";
import { Bar, Pie, Line, Scatter, Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const NeoChart = ({ neoData }) => {
  const [hazardousCount, setHazardousCount] = useState(0);
  const [nonHazardousCount, setNonHazardousCount] = useState(0);
  const [filteredData, setFilteredData] = useState(neoData);
  const [chartFilter, setChartFilter] = useState("All");

  useEffect(() => {
    if (neoData.length > 0) {
      const hazardous = neoData.filter(neo => neo.is_potentially_hazardous_asteroid).length;
      setHazardousCount(hazardous);
      setNonHazardousCount(neoData.length - hazardous);
      setFilteredData(neoData);
    }
  }, [neoData]);

  // Handle Filter Change
  const handleFilterChange = (filter) => {
    setChartFilter(filter);
    if (filter === "All") {
      setFilteredData(neoData);
    } else {
      const isHazardous = filter === "Hazardous";
      setFilteredData(neoData.filter(neo => neo.is_potentially_hazardous_asteroid === isHazardous));
    }
  };

  // 🔥 Scatter Plot (Heatmap Effect - Size vs Velocity)
  const scatterData = {
    datasets: [
      {
        label: "NEO Size vs Velocity",
        data: filteredData.map(neo => ({
          x: neo.estimated_diameter.meters.estimated_diameter_max,
          y: neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour,
        })),
        backgroundColor: filteredData.map(neo =>
          neo.is_potentially_hazardous_asteroid ? "rgba(255, 99, 132, 0.8)" : "rgba(54, 162, 235, 0.8)"
        ),
        pointRadius: 6,
      },
    ],
  };

  // 📊 Stacked Bar Chart (NEOs Per Day)
  const groupedData = filteredData.reduce((acc, neo) => {
    const date = neo.close_approach_data[0]?.close_approach_date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "NEOs per Day",
        data: Object.values(groupedData),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // 🍩 Doughnut Chart (Hazardous vs Non-Hazardous)
  const donutData = {
    labels: ["Hazardous", "Non-Hazardous"],
    datasets: [
      {
        data: [hazardousCount, nonHazardousCount],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 10,
      },
    ],
  };

  // 📈 Line Chart (Max Diameter Over Time)
  const lineData = {
    labels: filteredData.map(neo => neo.name),
    datasets: [
      {
        label: "Max Diameter (m)",
        data: filteredData.map(neo => neo.estimated_diameter.meters.estimated_diameter_max),
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // 💨 Velocity Distribution Bar Chart (NEW)
  const velocityData = {
    labels: filteredData.map(neo => neo.name),
    datasets: [
      {
        label: "Velocity (km/h)",
        data: filteredData.map(neo => neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour),
        backgroundColor: "rgba(255, 206, 86, 0.8)",
      },
    ],
  };

  // 📉 Closest Approach Distance Over Time (NEW)
  const approachData = {
    labels: filteredData.map(neo => neo.name),
    datasets: [
      {
        label: "Closest Approach Distance (km)",
        data: filteredData.map(neo => neo.close_approach_data[0]?.miss_distance.kilometers),
        borderColor: "#ffcc00",
        backgroundColor: "rgba(255, 204, 0, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6  bg-gray-900 text-white min-h-screen">
      {/* Top Section with Counts & Filter */}
      <div className="flex flex-col mt-10  md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Asteroid Data Insights 🚀</h1>
        {/* Filter Buttons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          {/* Filter Buttons Code */}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mt-4 md:mt-0">
        <button
          onClick={() => handleFilterChange("All")}
          className={`px-4 py-2 rounded-lg ${chartFilter === "All" ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-700`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("Hazardous")}
          className={`px-4 py-2 rounded-lg ${chartFilter === "Hazardous" ? "bg-red-500" : "bg-gray-700"} hover:bg-red-700`}
        >
          Hazardous
        </button>
        <button
          onClick={() => handleFilterChange("Non-Hazardous")}
          className={`px-4 py-2 rounded-lg ${chartFilter === "Non-Hazardous" ? "bg-green-500" : "bg-gray-700"} hover:bg-green-700`}
        >
          Non-Hazardous
        </button>
      </div>

      {/* Display Hazardous & Non-Hazardous Counts */}
      <div className="flex justify-center p-4 gap-4 text-center font-semibold mb-6">
  <div className="bg-red-600 text-xs md:text-lg px-2 py-1 md:px-6 md:py-3 rounded-lg shadow-md">
    Hazardous: {hazardousCount}
  </div>
  <div className="bg-blue-600 text-xs md:text-lg px-2 py-1 md:px-6 md:py-3 rounded-lg shadow-md">
    Non-Hazardous: {nonHazardousCount}
  </div>
</div>


      {/* Responsive Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Size vs Velocity Heatmap</h2>
          <Scatter data={scatterData} options={{ responsive: true }} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">NEOs Per Day</h2>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Hazardous vs Non-Hazardous</h2>
          <Doughnut data={donutData} options={{ responsive: true }} />
        </div>
        {/* Additional Charts */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Velocity Distribution (km/h)</h2>
          <Bar data={velocityData} options={{ responsive: true }} />
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Closest Approach Distance Over Time</h2>
          <Line data={approachData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default NeoChart;

