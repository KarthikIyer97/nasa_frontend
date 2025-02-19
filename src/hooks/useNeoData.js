import { useState } from 'react';
import axios from 'axios';

const useNeoData = () => {
    const [neoData, setNeoData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchNeoData = async (startDate, endDate) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/neo', {
                params: { startDate, endDate },
            });
            setNeoData(response.data.near_earth_objects); // Update neoData with response
        } catch (err) {
            console.error('Error fetching NEO data:', err); // Log error to console
            setError(err.message); // Update error state
        }
        setLoading(false); // End loading state after the fetch
    };

    return { neoData, fetchNeoData, error, loading }; // Return the necessary states and functions
};

export default useNeoData;
