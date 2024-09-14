// src/pages/Pricing.js
import React from 'react'
import { motion } from 'framer-motion'

const PricingCard = ({ title, price, features, recommended }) => (
  <motion.div 
    className={`bg-[#3B3B3B] rounded-lg p-6 flex flex-col ${recommended ? 'border-2 border-[#F1EFE7]' : ''}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-3xl font-semibold mb-6">${price}<span className="text-lg">/month</span></p>
    <ul className="mb-6 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
    <button className="bg-[#F1EFE7] text-[#2B2B2B] py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-300">
      Choose Plan
    </button>
  </motion.div>
)

const Pricing = () => {
  const plans = [
    {
      title: 'Free',
      price: 0.00,
      features: ['Access to 5 AI experts', '50 queries per month', 'Email support'],
      recommended: true,
    },
    {
      title: 'Pro',
      price: 19.99,
      features: ['Access to all AI experts', 'Unlimited queries', '24/7 priority support', 'Custom AI training'],
     
    },
    {
      title: 'Enterprise',
      price: 49.99,
      features: ['All Pro features', 'Dedicated account manager', 'API access', 'Custom integrations'],
    },
  ]

  return (
    <div className="bg-[#2B2B2B] min-h-screen text-[#F1EFE7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Plan</h1>
        <p className="text-xl mb-12 text-center">Get access to our AI experts and start expanding your knowledge today!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pricing