
import React from "react";

const Footer = ({ mainText, subText }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 text-center">
      <p className="text-lg md:text-xl font-semibold tracking-wide">
        © {currentYear} {mainText}
      </p>
      <p className="text-gray-400 text-sm md:text-base mt-1">{subText}</p>
    </footer>
  );
};

export default Footer;
