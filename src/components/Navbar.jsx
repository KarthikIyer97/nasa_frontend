


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Home from "./Home";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-2 backdrop-blur-md bg-black z-50">
         {/* Logo */}
         <Link to="/">
        <img src='/nasa.jpg' alt="NASA Logo" className="h-10" />
      </Link>
      
      {/* Navigation Links for Large Screens */}
      <ul className="hidden md:flex space-x-8 text-white text-sm font-light uppercase">
        {[
          { path: "/", label: "Home" },
          { path: "/asteroidtracker", label: "Asteroid Tracker" },
          { path: "/map", label: "Wildfire Tracker" },
          { path: "/marsgallery", label: "Mars Gallery" }
  
        ].map((item) => (
          <li key={item.path}>
            <Link 
              to={item.path} 
              className={`hover:text-gray-300 transition relative ${location.pathname === item.path ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <FaBars className="text-white text-xl cursor-pointer hover:opacity-80" onClick={() => setIsOpen(true)} />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 left-0 w-3/4 sm:w-1/2 bg-black flex flex-col items-start justify-start p-6 z-50 md:hidden">
          <div className="w-full flex justify-end">
            <FaTimes className="text-white text-2xl cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
          </div>
          <ul className=" text-white text-sm font-semibold uppercase w-full">
            {[
              { path: "/", label: "Home" },
              { path: "/asteroidtracker", label: "Asteroid Tracker" },
              { path: "/map", label: "Wildfire Tracker" },
              { path: "/marsgallery", label: "Mars Gallery" }
       
            ].map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className="hover:text-gray-300 transition block bg-black p-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// // src/components/Navbar.jsx

// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/asteroidtracker", label: "Asteroid Tracker" },
//     { path: "/map", label: "Wildfire Tracker" },
//     { path: "/marsgallery", label: "Mars Gallery" }
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-2 backdrop-blur-md bg-black bg-opacity-60 z-50">
//       {/* Logo */}
//       <Link to="/">
//         <img src="/nasa.jpg" alt="NASA Logo" className="h-10" />
//       </Link>

//       {/* Desktop Nav Links */}
//       <ul className="hidden md:flex space-x-8 text-white text-sm font-light uppercase">
//         {navItems.map(item => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`relative transition-colors hover:text-gray-300 ${
//                 location.pathname === item.path
//                   ? "text-white after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white"
//                   : ""
//               }`}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* Mobile Menu Toggle */}
//       <div className="md:hidden">
//         <FaBars
//           className="text-white text-xl cursor-pointer hover:opacity-80"
//           onClick={() => setIsOpen(true)}
//         />
//       </div>

//       {/* Mobile Nav Drawer */}
//       {isOpen && (
//         <div className="fixed inset-0 left-0 w-3/4 sm:w-1/2 bg-black bg-opacity-90 flex flex-col p-6 z-50">
//           <div className="w-full flex justify-end">
//             <FaTimes
//               className="text-white text-2xl cursor-pointer mb-4"
//               onClick={() => setIsOpen(false)}
//             />
//           </div>
//           <ul className="flex flex-col space-y-4 text-white text-base font-semibold uppercase">
//             {navItems.map(item => (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className="block hover:text-gray-300 transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
