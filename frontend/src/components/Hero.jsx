import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
    const features = [
        "✓ Instant access to subject-specific AI experts",
        "✓ Cost-effective consultations using your own API key",
        "✓ Seamless, chat-like interface for natural interactions",
        "✓ Vast knowledge base covering numerous disciplines",
        "✓ Personalized learning and problem-solving support"
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    }

    return (
        <section className="pt-12 sm:pt-16 bg-[#2B2B2B]">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-[#F1EFE7] sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                        Welcome to Synaptica
                    </h1>
                    <p className="max-w-2xl mx-auto mb-6 text-xl text-[#F1EFE7] opacity-90">
                        Where Human Curiosity Meets AI Intelligence
                    </p>
                    <p className="max-w-3xl mx-auto mb-8 text-lg text-[#F1EFE7] opacity-80">
                        Unlock the power of specialized knowledge with AI-powered expertise across countless fields.
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <motion.button
                            className="px-8 py-3 text-lg font-semibold text-[#2B2B2B] bg-[#F1EFE7] rounded-full hover:bg-opacity-90 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href="/experts">Get Started</a>
                        </motion.button>
                        <motion.button
                            className="px-8 py-3 text-lg font-semibold text-[#F1EFE7] bg-transparent border-2 border-[#F1EFE7] rounded-full hover:bg-[#F1EFE7] hover:text-[#2B2B2B] transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Learn More
                        </motion.button>
                       
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center">
                <h2 className="mb-4 text-2xl font-semibold text-[#F1EFE7]">Key Features</h2>
                <motion.ul
                    className="max-w-2xl mx-auto text-[#F1EFE7] opacity-80"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {features.map((feature, index) => (
                        <motion.li
                            key={index}
                            className="mb-2"
                            variants={itemVariants}
                        >
                            {feature}
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    )
}

export default Hero