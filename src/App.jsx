
// import React, { useEffect, useState } from "react";
// import DatePicker from './components/DatePicker';
// import NeoList from './components/NeoList';
// import NeoFilters from './components/NeoFilters'; // Import NeoFilters
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import "./index.css";
// import NeoChart from './components/NeoChart';




// const App = () => {
//   const [neoData, setNeoData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [filteredData, setFilteredData] = useState([]); // State for filtered NEO data
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
//   const [selectedDate, setSelectedDate] = useState(''); // State for selected date

//   // Array of image URLs
//   const images = [
//     '/background-image1.jpg',
//     '/background-image2.jpg',
//     '/background-image3.jpg',
//     '/background-image4.jpg'
//   ];

//   // Function to fetch NEO data
//   const fetchNeoData = async (startDate, endDate) => {
//     setLoading(true);
//     setError('');
//     console.log(`Fetching data for start date: ${startDate} and end date: ${endDate}`);

//     try {
//       const response = await fetch(`http://localhost:5000/api/neo?startDate=${startDate}&endDate=${endDate}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch Asteroid Data');
//       }

//       const data = await response.json();
//       console.log('Fetched NEO Data:', data); // Log the fetched data

//       // Collect NEOs for all dates between startDate and endDate
//       const allNeoData = Object.values(data.near_earth_objects).flat();

//       // Set the NEO data and filtered data
//       setNeoData(allNeoData);
//       setFilteredData(allNeoData); // Set initial filtered data to all fetched data

//     } catch (err) {
//       console.error('Error fetching NEO data:', err); // Log the error for debugging
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cycle through images every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Change image every 3 seconds

//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, [images.length]);

//   const handleFilterChange = (nearestApproachDate, isPotentiallyHazardous) => {
//     setSelectedDate(nearestApproachDate); // Set selected date
//     const filtered = neoData.filter((neo) => {
//       return neo.close_approach_data.some((approach) => 
//         new Date(approach.close_approach_date).toISOString().split('T')[0] === nearestApproachDate &&
//         (isPotentiallyHazardous ? neo.is_potentially_hazardous_asteroid : true)
//       );
//     });

//     setFilteredData(filtered); // Update filtered data
//     setModalOpen(true); // Open the modal
//   };

//   return (
//     <>
//       <Navbar />
//       <div
//         className="min-h-screen text-white bg-gray-900"
//         style={{
//           backgroundImage: `url(${images[currentImageIndex]})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           transition: 'background-image 1s ease-in-out',
//         }}
//       >
//         <div className="container mx-auto p-4">
//           <h1 className="text-4xl text-white font-bold text-center mb-8">Asteroid Tracker</h1>

//           <DatePicker onDateChange={fetchNeoData} />

//           <NeoFilters onFilterChange={handleFilterChange} /> {/* Include NeoFilters here */}

//           {loading && <p className="text-center">Loading...</p>}
//           {error && <p className="text-red-500 text-center">{error}</p>}

//           {filteredData.length > 0 ? (
//             <NeoList neoData={filteredData} />
//           ) : (
//             !loading && <p className="text-center">No NEOs found for the selected date range.</p>
//           )}
//         </div>
//       </div>

//       {/* Modal for filtered results */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
//           <div className="bg-gray-800 p-4 rounded-md shadow-lg max-w-md w-full">
//             <h2 className="text-lg font-bold text-white">Approach Date: {selectedDate} - Potentially Hazardous Asteroids</h2>
//             <ul className="overflow-y-auto max-h-60 text-white">
//               {filteredData.map((neo, index) => (
//                 <li key={index} className="text-gray-300">
//                   {neo.name}
//                 </li>
//               ))}
//             </ul>
//             <button onClick={() => setModalOpen(false)} className="mt-2 bg-blue-500 text-white p-2 rounded">Close</button>
//           </div>
//         </div>
//       )}

// // Inside your return statement after fetching and setting neoData
// <NeoChart neoData={filteredData} />

//       <Footer />
//     </>
//   );
// };

// export default App;


import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AsteroidTracker from './components/AsteroidTracker';
import Navbar from './components/Navbar'; // Ensure Navbar is imported
import "./index.css";
import Map from './components/Map';

const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asteroidtracker" element={<AsteroidTracker />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
};

export default App;


