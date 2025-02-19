


import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import axios from "axios";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { FaLinkedin, FaGithub, FaGlobe, FaPaperPlane } from "react-icons/fa";
import Footer from "./Footer";


const Home = () => {
  const [apod, setApod] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { message: "Hello, I'm ChatGPT! Ask me anything about astronomy and galaxies!", sender: "ChatGPT" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [inputMessage, setInputMessage] = useState(""); // ✅ Stores the input message
  const chatRef = useRef(null);

  const API_URL = "https://nasa-astronomy-backend.onrender.com/api/chat"; 

  const fetchApodData = async () => {
    try {
      const response = await fetch("https://nasa-astronomy-backend.onrender.com/api/apod");
      if (!response.ok) throw new Error("Failed to fetch APOD data");
      const data = await response.json();
      setApod(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApodData();
  }, []);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const newMessage = { message, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);
    setInputMessage(""); // ✅ Clear input after sending

    try {
      const response = await axios.post(API_URL, 
        { prompt: newMessage.message }, 
        { headers: { "Content-Type": "application/json" } }
      );

      const botResponse = response.data.response || "No response received.";
      setMessages((prevMessages) => [...prevMessages, { message: botResponse, sender: "ChatGPT" }]);

      setTimeout(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("🚨 Error fetching response:", error.response?.data || error.message);
      setMessages((prevMessages) => [...prevMessages, { message: "Oops! Couldn't fetch a response. Try again later.", sender: "ChatGPT" }]);
    } finally {
      setIsTyping(false);
      
    }
    // Prevent main webpage scrolling only when chatbot scrolls
const chatContainer = document.querySelector(".chat-container");
const prevScrollY = window.scrollY;
if (chatContainer) {
  chatContainer.style.marginBottom = "50px"; // Adjust chatbot position lower
  chatContainer.addEventListener("wheel", (e) => {
    e.stopPropagation(); // Prevent scrolling the main page
  });
}
window.scrollTo(0, prevScrollY);
    
  };
  




  // ✅ FIX: Quick options for chatbot now work AND user can manually send messages
  const handleQuickMessage = (type) => {
    let prompt;
    switch (type) {
      case "fact":
        prompt = "Tell me an interesting astronomy fact.";
        break;
      case "quote":
        prompt = "Give me an inspirational astronomy quote.";
        break;
      case "asteroid":
        prompt = "Give me information about asteroids.";
        break;
      default:
        return;
    }
    setInputMessage(prompt);
    handleSend(prompt); // ✅ Sends the message properly
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
    <div className="relative min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${apod.media_type === "image" ? apod.hdurl : "/placeholder.jpg"})`, filter: "brightness(0.6)" }}>
      </div>

      {/* Main Content */}
    
       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 pt-20">
  <motion.div className="max-w-3xl text-center">
    <h1 className="text-4xl mt-5 sm:text-7xl font-extrabold uppercase tracking-wider">
      Astronomy
    </h1>
    <p className="text-lg mt-4 italic">
      {loading ? "Loading..." : error ? error : apod.title}
    </p>

    {/* Read More Button */}
    <button
      className="mt-4 px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
      onClick={() => setShowDescription(!showDescription)}
    >
      {showDescription ? "Hide" : "Read More..."}
    </button>

    {/* Description Section */}
    {showDescription && (
      <motion.div
        className="mt-4 w-full sm:w-64 bg-gray-900 bg-opacity-90 p-4 rounded-lg shadow-lg overflow-y-auto z-50 cursor-pointer scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 sm:absolute sm:top-28 sm:left-5"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxHeight: "250px" }}
      >
        <p className="text-md italic">
          {loading
            ? "Loading description..."
            : error
            ? "Error loading description"
            : apod.explanation.length > 1400
            ? apod.explanation.substring(0, 1400) + "..."
            : apod.explanation}
        </p>
      </motion.div>
    )}
  </motion.div>
</div>

     

      ✅ Chatbot Section (Fixed Everything)
      <div className="w-full sm:absolute sm:right-10 sm:bottom-10 sm:w-80 bg-black bg-opacity-80 backdrop-blur-lg p-4 rounded-lg shadow-xl z-50">
        
        {/* Quick Options */}
        <div className="flex justify-between mb-3">
          <button className="text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition focus:outline-none"
            onClick={() => handleQuickMessage("fact")}
          >
            🌟 Astronomy Fact
          </button>
          <button className="text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700 transition focus:outline-none"
            onClick={() => handleQuickMessage("quote")}
          >
            ✨ Astronomy Quote
          </button>
          <button className="text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700 transition focus:outline-none"
            onClick={() => handleQuickMessage("asteroid")}
          >
            ☄️ Asteroid Info
          </button>
        </div>

        {/* Chat Messages */}
        <div className="max-h-64 overflow-auto p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          {messages.map((message, i) => (
            <p key={i} className={`p-2 rounded-md ${message.sender === "user" ? "text-right text-blue-400" : "text-left text-gray-300"}`}>
              {message.message}
            </p>
          ))}
          <div ref={chatRef}></div>
        </div>

        {/* ✅ Chat Input */}
      <div className="relative w-full mt-2">
  <input 
    type="text" 
    value={inputMessage}
    onChange={(e) => setInputMessage(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSend(inputMessage)}
    placeholder="Ask me anything..." 
    className="w-full p-2 pr-10 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-purple-500"
  />
  
  <button
    onClick={() => handleSend(inputMessage)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
    style={{ height: '36px', width: '36px' }}
  >
    <FaPaperPlane className="text-white" />
  </button>
</div>



      </div>
       {/* ✅ Social Media Links */}
       <div className="left-1/2 transform -translate-x-1/2 sm:absolute bottom-10  sm:left-16 flex space-x-4 z-50">
        <a href="https://www.linkedin.com/in/karthik-iyer7/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white text-3xl cursor-pointer hover:text-blue-500 transition" />
        </a>
        <a href="https://github.com/KarthikIyer97" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white text-3xl cursor-pointer hover:text-gray-400 transition" />
        </a>
        <a href="https://karthik-portfolio-ruby.vercel.app/" target="_blank" rel="noopener noreferrer">
          <FaGlobe className="text-white text-3xl cursor-pointer hover:text-green-400 transition" />
        </a>
      </div>
          
    </div>
    <Footer mainText="Asteroid Picture of the Day & Chatbot. All Rights Reserved." subText="Built with love for astronomy enthusiasts." />
        </>
    
  );
};

export default Home;

