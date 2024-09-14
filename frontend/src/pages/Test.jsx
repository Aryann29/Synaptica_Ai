
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'

// const ExpertCard = ({ name, field, description, image }) => (
//   <motion.div 
//     className="bg-[#3B3B3B] rounded-lg p-3 flex flex-col items-center text-center h-full"
//     whileHover={{ scale: 1.03 }}
//     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//   >
//     <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mb-2" />
//     <h3 className="text-base font-semibold">{name}</h3>
//     <p className="text-[#F1EFE7] opacity-80 text-xs">{field}</p>
//     <p className="mt-1 text-xs line-clamp-3">{description}</p>
//     <motion.button 
//       className="mt-2 bg-[#F1EFE7] text-[#2B2B2B] px-3 py-1 rounded text-xs hover:bg-opacity-90"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       Consult
//     </motion.button>
//   </motion.div>
// )

// const Experts = () => {
//   const expertsList = [
//     {
//       name: "AI Physics Expert",
//       field: "Physics & Astronomy",
//       description: "Specializes in quantum mechanics, astrophysics, and relativity theory.",
//       image: "https://i.ibb.co/Kx9Kgj8/atom.png"
//     },
//     {
//       name: "AI History Specialist",
//       field: "World History",
//       description: "Expert in ancient civilizations, modern history, and historical analysis.",
//       image: "https://i.ibb.co/Dpdn8wz/evolution.png"
//     },
//     {
//       name: "AI Programming Guru",
//       field: "Computer Science",
//       description: "Proficient in multiple programming languages, algorithms, and software architecture.",
//       image: "https://i.ibb.co/QQ8ybCX/programming.png"
//     },
//     {
//       name: "AI Biology Researcher",
//       field: "Life Sciences",
//       description: "Expertise in genetics, molecular biology, and evolutionary studies.",
//       image: "https://i.ibb.co/tY32m8R/biology.png"
//     },
//     {
//       name: "AI Economics Analyst",
//       field: "Economics & Finance",
//       description: "Specialized in macroeconomics, market trends, and financial forecasting.",
//       image: "https://i.ibb.co/tY32m8R/biology.png"
//     },
//     {
//       name: "AI Literature Professor",
//       field: "Literature & Languages",
//       description: "Expert in classic and contemporary literature, literary analysis, and linguistics.",
//       image: "https://i.ibb.co/Z1fzztW/poetry.png"
//     },
//     // Add more experts as needed
//   ]

//   return (
//     <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-center">Our AI Experts</h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {expertsList.map((expert, index) => (
//             <ExpertCard key={index} {...expert} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Experts