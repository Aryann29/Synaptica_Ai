import React from 'react'
import { motion } from 'framer-motion'

const ExpertCard = ({ name, field, image }) => (
  <motion.div 
    className="flex-none w-56 mx-6 bg-[#3B3B3B] rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
    whileHover={{ y: -5 }}
  >
    <div className="h-40 flex items-center justify-center bg-[#2B2B2B] p-4">
      <motion.img 
        src={image} 
        alt={name} 
        className="w-24 h-24 object-contain"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#F1EFE7] mb-1 truncate">{name}</h3>
      <p className="text-[#F1EFE7] opacity-80 text-sm mb-3 truncate">{field}</p>
      <motion.button 
        className="w-full px-4 py-2 bg-[#F1EFE7] text-[#2B2B2B] rounded-full text-sm font-medium hover:bg-opacity-90 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More
      </motion.button>
    </div>
  </motion.div>
)

const ExpertShowcase = () => {
    const experts = [
        { name: "AI Physics Expert", field: "Physics & Astronomy", image: "https://i.ibb.co/Kx9Kgj8/atom.png" },
        { name: "AI History Specialist", field: "World History", image: "https://i.ibb.co/Dpdn8wz/evolution.png" },
        { name: "AI Programming Guru", field: "Computer Science", image: "https://i.ibb.co/QQ8ybCX/programming.png" },
        { name: "AI Biology Researcher", field: "Life Sciences", image: "https://i.ibb.co/tY32m8R/biology.png" },
    ]

    return (
        <section className="py-16 bg-[#2B2B2B] text-[#F1EFE7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 
                    className="text-3xl font-bold text-center text-[#F1EFE7] mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Meet Our AI Experts
                </motion.h2>
                <motion.div 
                    className="overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.div
                        className="flex py-4"
                        animate={{ x: [0, -100 + "%"] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 60,
                                ease: "linear",
                            },
                        }}
                    >
                        {experts.concat(experts).map((expert, index) => (
                            <ExpertCard key={index} {...expert} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default ExpertShowcase