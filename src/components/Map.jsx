

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


const fireIcon = new L.Icon({
  iconUrl: "/flame.png",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const countryCoordinates = [
  { name: "USA", latMin: 24, latMax: 49, lngMin: -125, lngMax: -66 },
  { name: "Australia", latMin: -44, latMax: -10, lngMin: 112, lngMax: 154 },
  { name: "Canada", latMin: 42, latMax: 83, lngMin: -141, lngMax: -52 },
  { name: "Brazil", latMin: -35, latMax: 5, lngMin: -74, lngMax: -34 },
  { name: "Russia", latMin: 41, latMax: 81, lngMin: 19, lngMax: 180 },
  { name: "India", latMin: 8, latMax: 37, lngMin: 68, lngMax: 97 },


  // 🌍 Africa & Europe Regions
  { name: "African Continent", latMin: -35, latMax: 37, lngMin: -25, lngMax: 55 },
  { name: "South Africa", latMin: -35, latMax: -22, lngMin: 16, lngMax: 33 },
  { name: "Central Africa", latMin: -10, latMax: 10, lngMin: 15, lngMax: 30 },
  { name: "European Countries", latMin: 35, latMax: 72, lngMin: -25, lngMax: 45 },
];




const getCountry = (title, coordinates) => {
    for (let country of countryCoordinates) {
      if (title.includes(country.name)) return country.name;
    }
    const [lng, lat] = coordinates;
    for (let country of countryCoordinates) {
      if (
        lat >= country.latMin &&
        lat <= country.latMax &&
        lng >= country.lngMin &&
        lng <= country.lngMax
      ) {
        return country.name;
      }
    }
    return "Unknown";
  };

const Map = () => {
  const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
    const [loadingText, setLoadingText] = useState("Wildfires for 2025 are loading...");
  const [showLoadingText, setShowLoadingText] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://nasa-astronomy-backend.onrender.com/api/eonet"
        );
        if (!response.ok) throw new Error("Failed to fetch wildfire data");

        const data = await response.json();
        console.log("Fetched Wildfires: ", data.events);

        setEventData(data.events);
      } catch (error) {
        console.error("Error fetching wildfires:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setShowLoadingText(false), 2000);
      }
    };

    fetchEvents();
  }, []);

    // ✅ Generate last 6 months dynamically
  const getMonths = () => {
    const months = [];
    let currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      let month = currentDate.toLocaleString("default", { month: "long" });
      let year = currentDate.getFullYear();
      months.push(`${month} ${year}`);
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return months.reverse();
  };

    // 🎯 Apply Filters: Year, Month, Country
  const filteredEvents = eventData.filter((event) => {
    if (!event.geometries || event.geometries.length === 0) return false;

    const eventDate = new Date(event.geometries[0].date);
    const eventYear = eventDate.getFullYear().toString();
    const eventMonth = `${eventDate.toLocaleString("default", { month: "long" })} ${eventYear}`;
    const eventCountry = getCountry(event.title, event.geometries[0].coordinates);

    return (
      (selectedYear === "All" || eventYear === selectedYear) &&
      (selectedMonth === "All" || eventMonth === selectedMonth) &&
      (selectedCountry === "All" || eventCountry === selectedCountry)
    );
  });
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <div className="p-4 bg-gray-900 text-white">
        <h2 className="text-xl font-bold">Filters</h2>
      </div>

      <div className="p-10 md:hidden flex justify-between items-center bg-gray-900 text-white">
        <button onClick={() => setShowFilters(!showFilters)} className="bg-gray-700 px-3 py-1 rounded">
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <div className={`md:w-1/4 bg-gray-900 text-white p-4 ${showFilters ? "block" : "hidden"} md:block`}>
               {/* 📅 Year Filter */}
         <label className="block mb-2 text-gray-300">Year:</label>
       <select className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
          value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="All">All</option>
        </select>

        {/* 📆 Month Filter */}
        <label className="block mb-2 text-gray-300">Month:</label>
        <select className="w-full p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
          value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="All">All</option>
          {getMonths().map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>

        {/* 🌎 Country Filter */}
        <label className="block mb-2 text-gray-300">Country:</label>
        <select className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
          value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="All">All</option>
          {countryCoordinates.map((c, index) => (
            <option key={index} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

        {/* Map Container */}
        <div className="md:w-3/4 w-full">
        {showLoadingText && (
    <div className="bg-black text-red-700 font-bold text-xl py-2 text-center">
      <marquee behavior="scroll" direction="left">
        Wildfires for <span className="text-white">{selectedMonth !== "All" ? selectedMonth : selectedYear}</span>
        {selectedCountry !== "All" ? ` in ${selectedCountry}` : ""} are loading...
      </marquee>
    </div>
)}
       
         <MapContainer center={[10,0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

           {/* 🔥 Display Wildfire Markers */}
           {filteredEvents.map((event, index) => {
             const [lng, lat] = event.geometries[0].coordinates;
             const eventDate = new Date(event.geometries[0].date).toLocaleString();

             return (
               <Marker key={index} position={[lat, lng]} icon={fireIcon}>
                 <Tooltip>
                   <strong>{event.title}</strong><br />
                   {eventDate}<br />
                   {lat.toFixed(2)}, {lng.toFixed(2)}
                 </Tooltip>
               </Marker>
             );
           })}
         </MapContainer>
      {/*  */}
      <Footer mainText="Tracking Wildfires Across the Globe." />
    </div>
    </div>
    </div>
  );
};

export default Map;

