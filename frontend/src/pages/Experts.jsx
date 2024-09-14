import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const ExpertCard = ({ name, field, description, image, id, index }) => (
  <motion.div 
    className="bg-[#3B3B3B] rounded-lg p-3 flex flex-col items-center text-center h-full"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5,
      delay: index * 0.1, // Stagger effect
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ scale: 1.03 }}
  >
    <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mb-2" />
    <h3 className="text-base font-semibold">{name}</h3>
    <p className="text-[#F1EFE7] opacity-80 text-xs">{field}</p>
    <p className="mt-1 text-xs line-clamp-3">{description}</p>
    <motion.button 
      className="mt-2 bg-[#F1EFE7] text-[#2B2B2B] px-3 py-1 rounded text-xs hover:bg-opacity-90"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={`/chat/${id}`} className="block w-full h-full">
      Ask
      </Link>
    </motion.button>
  </motion.div>
);
const Experts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch('https://synaptica-backend.vercel.app/api/experts/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExperts(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch experts: ' + error.message);
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  if (loading) return (
    <div className="h-screen bg-[#2B2B2B] text-[#F1EFE7] flex mt-[215px] justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-10 h-10 border-4 border-[#F1EFE7] border-t-transparent rounded-full"
        />
        <p className="mt-4 text-[#F1EFE7]">Loading.</p>
      </div>
    </div>
  );
  
  if (error) return <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] flex items-center justify-center">{error}</div>;

  return (
    <motion.div 
      className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our AI Experts
        </motion.h1>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {experts.map((expert, index) => (
            <ExpertCard key={expert.id} {...expert} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experts;