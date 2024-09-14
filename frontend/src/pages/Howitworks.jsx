// src/pages/HowItWorks.js
import React from 'react'
import { motion } from 'framer-motion'

const Step = ({ number, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center mb-12"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: number * 0.2 }}
  >
    <div className="w-16 h-16 bg-[#F1EFE7] text-[#2B2B2B] rounded-full flex items-center justify-center text-2xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="max-w-md">{description}</p>
  </motion.div>
)

const HowItWorks = () => {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create your account and choose a plan that fits your needs.',
    },
    {
      title: 'Choose Your Expert',
      description: 'Select from our wide range of AI experts specialized in various fields.',
    },
    {
      title: 'Ask Your Question',
      description: 'Type your question or describe your problem in detail.',
    },
    {
      title: 'Get Instant Answers',
      description: 'Receive comprehensive, accurate responses from your AI expert in real-time.',
    },
  ]

  return (
    <div className="bg-[#2B2B2B] min-h-screen text-[#F1EFE7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">How Synaptica Works</h1>
        <p className="text-xl mb-12 text-center">Get expert AI consultation in just a few simple steps</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Step key={index} number={index + 1} {...step} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks