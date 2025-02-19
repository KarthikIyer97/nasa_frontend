
import React from "react";

const NeoCard = ({ neo, index }) => {
  // Find the closest approach date & time and convert to Date object
  const closestApproach = neo.close_approach_data.reduce((prev, current) => {
    return new Date(current.epoch_date_close_approach) < new Date(prev.epoch_date_close_approach)
      ? current
      : prev;
  });

  // Convert the date string into a JavaScript Date object
  const approachDate = new Date(closestApproach.epoch_date_close_approach);

  // Assign image based on index (1 to 7 cycling)
  const imageIndex = (index % 7) + 1;

  return (
    <div className="bg-slate-800 text-center text-white border border-gray-300 rounded-lg pt-2 pb-2 shadow-lg transition duration-100 hover:shadow-2xl w-80 h-100 text-sm">
      <img src={`/asteroid-img${imageIndex}.jpeg`} alt="Asteroid" className="w-full h-50 object-cover rounded-t-lg" />
      <h3 className="text-lg font-bold mb-1 mt-2">{neo.name}</h3>
      <p><strong>Diameter (Max):</strong> {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}m </p>
      <p><strong>Diameter (Min):</strong> {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(1)}m</p>
      <p><strong>Status:</strong> {neo.is_potentially_hazardous_asteroid ? '⚠️ Hazardous' : '✅ Safe'}</p>
      <p><strong>Magnitude:</strong> {neo.absolute_magnitude_h.toFixed(1)} </p>
      <p><strong>Approach Date:</strong> {approachDate.toLocaleDateString()} </p>
      <p><strong>Approach Time:</strong> {approachDate.toLocaleTimeString()} </p>
    </div>
  );
};

export default NeoCard;
