


import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify styles
import NeoFilters from "./NeoFilters";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NeoChart from "./NeoChart";
import NeoCard from "./NeoCard";
import { motion } from "framer-motion";

const backgroundImages = [
  "/asteroid-image2.jpeg",
  "/asteroid-image3.jpeg",
  "/asteroid-image4.jpeg",
  "/asteroid-image5.jpeg",
  "/asteroid-image6.jpeg",
  "/asteroid-image7.jpeg",
];

const AsteroidTracker = () => {
  const [neoData, setNeoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [closestApproachDate, setClosestApproachDate] = useState("");
  const [isHazardous, setIsHazardous] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [flip, setFlip] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isAutoScrolling && filteredData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredData.length);
        setFlip((prevFlip) => prevFlip - 360);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [filteredData, isAutoScrolling]);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(bgInterval);
  }, []);

  const fetchNeoData = async (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const dateDiff = (endDateObj - startDateObj) / (1000 * 60 * 60 * 24); // ✅ Calculate days difference

    // ✅ Check if date difference is greater than 7 days
    if (dateDiff > 7) {
      toast.error("Please provide the input of the dates which is in 7 days range 🚀");
      return; // ✅ Stop API call if the date range is invalid
    }

    setLoading(true);
    setError("");
    setFilteredData([]);
    setNeoData([]);

    try {
      const response = await fetch(
        `https://nasa-astronomy-backend.onrender.com/api/neo?startDate=${start}&endDate=${end}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Asteroid Data");
      }
      const data = await response.json();
      const allNeoData = Object.values(data.near_earth_objects).flat();

      setNeoData(allNeoData);
      setFilteredData(allNeoData);
      setStartDate(start);
      setEndDate(end);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error fetching NEO data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const applyFilters = (newFilters, selectedDate) => {
  if (!startDate || !endDate) {
    toast.error("Please select a start and end date before applying filters.");
    return;
  }

  // const applyFilters = (newFilters, selectedDate) => {
    
    let filtered = neoData;

    if (selectedDate) {
      filtered = filtered.filter((neo) =>
        neo.close_approach_data.some(
          (approach) =>
            new Date(approach.close_approach_date).toISOString().split("T")[0] === selectedDate
        )
      );
    }

    if (newFilters.hazardous) {
      filtered = filtered.filter((neo) => neo.is_potentially_hazardous_asteroid);
      setIsHazardous(true);
    } else {
      setIsHazardous(false);
    }

    setFilteredData(filtered);
    setClosestApproachDate(selectedDate || "");
    setCurrentIndex(0);
  };

  return (
    <>
      {/* ✅ Fixed Navbar */}
      <Navbar />

      {/* ✅ Toast Notification Container */}
      <ToastContainer position="top-center" autoClose={3000} />

      <div
        className="min-h-screen text-white flex flex-col items-center pt-24" // ✅ Added pt-24 to push content down
        style={{
          backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
  

<div className="container mx-auto p-4 text-center">
<h1
  className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wide text-purple-900 sm:text-blue-700"
  style={{
    textShadow: "1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white",
    WebkitTextStrokeWidth: "1px",
    WebkitTextStrokeColor: "white",
  }}
>
  Asteroid Explorer 🚀
</h1>


  <NeoFilters
    onFilterChange={applyFilters}
    fetchAsteroids={fetchNeoData}
    startDate={startDate}
    endDate={endDate}
  />
</div>


<div className="w-full flex justify-center items-center overflow-hidden relative">
  {filteredData.length > 0 && !loading ? (
    <motion.div
      className="relative flex space-x-0 sm:space-x-10 cursor-grab"
      animate={{ x: -currentIndex * 320 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ width: '320px' }} // Ensure the container width matches the card width on smaller screens
    >
      {filteredData.map((neo, index) => (
        <motion.div
          key={neo.id}
          className="transition-all duration-1000 ease-in-out transform"
          animate={{
            scale: index === currentIndex ? 1.02 : 0.95,
            rotateY: index === currentIndex ? 0 : flip,
            opacity: 1,
            translateX: index < currentIndex ? -50 : index > currentIndex ? 50 : 0,
            rotateX: index === currentIndex ? 0 : index < currentIndex ? -10 : 10,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <NeoCard neo={filteredData[index]} index={index} />
        </motion.div>
      ))}
    </motion.div>
  ) : (
    <p className="text-gray-400 text-lg mt-4">
      {loading ? "Fetching data..." : "No asteroids found. Try different filters!"}
    </p>
  )}
</div>

      </div>
      <NeoChart neoData={filteredData} />
      <Footer mainText="🚀 Asteroid Tracker. All Rights Reserved." subText="Built for astronomy enthusiasts." />
    </>
  );
};

export default AsteroidTracker;
