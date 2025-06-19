

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import ContactForm from './ContactForm';

const MarsGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = ['/mars1.jpg', '/mars2.jpg', '/mars3.jpg'];


  // Typing effect setup
  const title = "Time to Explore Mars";
  const heading = useMotionValue(0);
  const display = useTransform(heading, v => title.slice(0, Math.floor(v)));

    useEffect(() => {
    const controls = animate(heading, title.length + 1, { duration: title.length  * 0.23, ease: 'linear', repeat: Infinity, repeatType: 'reverse' });
    return () => controls.stop();
  }, []);



  // Fetch Mars photos & cycle bg
  useEffect(() => {
    const fetchMars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://nasa-backend-2can.onrender.com/api/marsphotos`, {
          params: { sol: 1000}
        });
        setPhotos(res.data.photos.slice(0, 60));
      } catch {
        toast.error('Failed to fetch Mars photos');
      } finally {
        setLoading(false);
      }
    };
    fetchMars();

    const bgTimer = setInterval(() => setBgIndex(i => (i + 1) % bgImages.length), 5000);
    return () => clearInterval(bgTimer);
  }, []);

  // Responsive & mobile carousel setup
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [mobileIdx, setMobileIdx] = useState(0);
  useEffect(() => {
    if (isMobile && photos.length) {
      const iv = setInterval(() => setMobileIdx(i => (i + 1) % photos.length), 1000);
      return () => clearInterval(iv);
    }
  }, [isMobile, photos]);

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      {bgImages.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${img})` }}
          initial={{ opacity: i === bgIndex ? 1 : 0 }}
          animate={{ opacity: i === bgIndex ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <Navbar />
      <ToastContainer position="top-center" />

      <header className="pt-20 text-center px-4 z-10">
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-cyan-400 drop-shadow-lg inline-block">
          <motion.span>{display}</motion.span><motion.span className="blinking-cursor">|</motion.span>
        </motion.h1>
        <motion.p
          className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: title.length * 0.2 + 0.5, duration: 1 }}
        >
          Discover Mars through the eyes of Curiosity.
        </motion.p>
      </header>

      

      <section className="mt-6 flex-grow px-4 z-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center uppercase tracking-wide">
          Stunning Martian Captures
        </h2>
        <div className="relative overflow-hidden w-full">
          {loading && <p className="text-center text-xl">Loading photos...</p>}

          {!loading && isMobile && photos[mobileIdx] && (
            <motion.div
              key={`mobile-${mobileIdx}`}
              className="mx-auto w-64 border-4 rounded-lg bg-gray-900 shadow-lg border-cyan-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <img
                src={photos[mobileIdx].img_src}
                alt={photos[mobileIdx].camera.full_name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-2 text-sm text-gray-200">
                <p><strong>Cam:</strong> {photos[mobileIdx].camera.name}</p>
                <p><strong>Date:</strong> {photos[mobileIdx].earth_date}</p>
                <p><strong>Rover:</strong> {photos[mobileIdx].rover.name}</p>
              </div>
            </motion.div>
          )}

          {!loading && !isMobile && (
            <motion.div
              className="flex py-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
            >
              {photos.map((p, i) => {
                const center = Math.floor(photos.length / 2);
                const isCenter = i === center;
                return (
                  <motion.div
                    key={`${p.id}-${i}`}
                    className={`flex-shrink-0 w-56 sm:w-64 mx-2 border-4 rounded-lg bg-gray-900 shadow-lg ${
                      isCenter ? 'border-cyan-400' : 'border-navy-800'
                    }`}
                    whileHover={{
                      scale: isCenter ? 1.2 : 1.1,
                      rotateY: isCenter ? 10 : 5,
                      boxShadow: '0px 25px 50px rgba(0,0,0,0.8)'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02, duration: 0.5 }}
                  >
                    <img
                      src={p.img_src}
                      alt={p.camera.full_name}
                      className="w-full h-36 sm:h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-2 text-sm text-gray-200">
                      <p><strong>Cam:</strong> {p.camera.name}</p>
                      <p><strong>Date:</strong> {p.earth_date}</p>
                      <p><strong>Rover:</strong> {p.rover.name}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

        {/* EmailJS Contact Form */}
      <section className="bg-black bg-opacity-80 py-10 z-10">
        <ContactForm />
      </section>

      <footer className="text-center py-6 bg-black bg-opacity-90 text-gray-400 z-10">
        <p>🔴 Mars Rover Gallery | Powered by NASA API</p>
      </footer>

      <style>{`
        .blinking-cursor { display: inline-block; width: 1ch; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};

export default MarsGallery;




