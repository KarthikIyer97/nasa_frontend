
import React from "react";
import NeoCardContainer from "./NeoCardContainer"; // Import the container


const NeoList = ({ neoData }) => {
  console.log('NeoList received neoData:', neoData); // Log the data to ensure it's correct

  return (
    <div className="neo-list flex flex-col items-center mt-8">
      {/* Centered Title */}
      <h2 className="text-center text-4xl font-bold mb-2 text-gray-100">Near-Earth Objects</h2>

      {/* Conditional Rendering of NEO Data */}
      {neoData && neoData.length === 0 ? (
        <p className="text-center text-lg text-gray-300">No Near-Earth Objects found for the selected date range.</p>
      ) : (
        <NeoCardContainer neoData={neoData} /> // Display the container with card navigation
      )}
    </div>
  );
};

export default NeoList;







