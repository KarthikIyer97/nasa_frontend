

import React, { useState, useRef } from 'react';
import NeoCard from './NeoCard';

const NeoCardContainer = ({ neoData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Move to the next set of cards
  const nextCards = () => {
    if (currentIndex < neoData.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next card
    }
  };

  // Move to the previous set of cards
  const prevCards = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Move to the previous card
    }
  };

  // Mouse drag handlers for swiping through the carousel
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Increase scroll sensitivity
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Carousel Wrapper */}
      <div
        className="carousel-wrapper flex overflow-x-hidden w-full"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cards */}
        {neoData.slice(currentIndex, currentIndex + (window.innerWidth < 768 ? 1 : 3)).map((neo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/3 p-2 sm:p-4 transition-transform duration-500 transform hover:scale-110"
          >
            <NeoCard neo={neo} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between mt-4 w-full px-4">
        {/* Left Arrow */}
        <button
          onClick={prevCards}
          className={`bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-gray-600 mx-1 sm:mx-2 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable if first card
          disabled={currentIndex === 0}
        >
          &#9664;
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextCards}
          className={`bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-gray-600 mx-1 sm:mx-2 ${currentIndex + (window.innerWidth < 768 ? 1 : 3) >= neoData.length ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable if last card
          disabled={currentIndex + (window.innerWidth < 768 ? 1 : 3) >= neoData.length}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default NeoCardContainer;
