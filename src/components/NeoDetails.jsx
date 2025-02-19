import React from 'react';

const NeoDetails = ({ neo, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70" role="dialog" aria-labelledby="neo-details-title" aria-modal="true">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 id="neo-details-title" className="text-2xl font-bold mb-4 text-center">{neo.name}</h2>

                <p><strong>Estimated Diameter (Min):</strong> {neo.estimated_diameter.meters.estimated_diameter_min ? neo.estimated_diameter.meters.estimated_diameter_min.toFixed(2) : 'N/A'} meters</p>
                <p><strong>Estimated Diameter (Max):</strong> {neo.estimated_diameter.meters.estimated_diameter_max ? neo.estimated_diameter.meters.estimated_diameter_max.toFixed(2) : 'N/A'} meters</p>
                <p><strong>Potentially Hazardous:</strong> {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>

                {/* Close approach data */}
                <h3 className="text-xl font-semibold mt-4">Close Approach Data:</h3>
                <ul>
                    {neo.close_approach_data.length > 0 ? (
                        neo.close_approach_data.map((approach, index) => (
                            <li key={index} className="mt-2">
                                <p><strong>Date:</strong> {approach.close_approach_date}</p>
                                <p><strong>Miss Distance:</strong> {approach.miss_distance.kilometers} km</p>
                                <p><strong>Velocity:</strong> {approach.relative_velocity.kilometers_per_hour} km/h</p>
                            </li>
                        ))
                    ) : (
                        <p>No close approach data available.</p>
                    )}
                </ul>

                <button 
                    onClick={onClose} 
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    aria-label="Close NEO details"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NeoDetails;
