

import React, { useState } from 'react';

const DatePicker = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Function to format date as YYYY-MM-DD
    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().slice(0, 10);
        return formattedDate;
    };

    // Function to calculate the number of days between two dates
    const calculateDaysDifference = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const differenceInTime = endDate.getTime() - startDate.getTime();
        return differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if both dates are provided
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        const daysDifference = calculateDaysDifference(startDate, endDate);

        // Check if the date difference is more than 7 days
        if (daysDifference > 7) {
            alert('Only 7 days of data can be fetched. Please select a date range within 7 days.');
            return;
        }

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        onDateChange(formattedStartDate, formattedEndDate); // Send formatted dates to the backend
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center mb-6">
            <div className="mx-2 mb-4 sm:mb-0">
                <label className='block text-sm font-medium mb-1'>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className='bg-gray-800 border border-gray-600 text-white p-2 rounded-md'
                />
            </div>
            <div className='mx-2 mb-4 sm:mb-0'>
                <label className='block text-sm font-medium mb-1'>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='bg-gray-800 border border-gray-600 text-white p-2 rounded-md'
                />
            </div>

            {/* Fetch Asteroids button will be below the inputs in mobile screens and centered */}
            <div className="w-full flex justify-center sm:justify-start mt-2 sm:mt-0 md:mt-5">
                <button
                    type='submit'
                    className='bg-blue-600 text-white mt-4 sm:mt-0 px-4 py-2 rounded-md hover:bg-blue-700'
                >
                    Fetch Asteroids
                </button>
            </div>
        </form>
    );
};

export default DatePicker;

