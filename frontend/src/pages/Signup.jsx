import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { signup } = useContext(AuthContext); // Assuming you have a signup method in your AuthContext
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await signup(formData);
            if (success) {
                console.log('SignUp successful');
                navigate('/'); // Redirect on successful signup
            } else {
                setError('SignUp failed. Please try again.');
            }
        } catch (error) {
            console.error('SignUp error:', error);
            setError('SignUp failed. Please try again.');
        }
    };

    return (
        <section className="h-screen flex justify-center bg-[#2B2B2B] px-4 mt-32">
            <motion.div 
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center text-[#F1EFE7] mb-8">
                    Join Synaptica
                </h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['first_name', 'last_name', 'username', 'email', 'password'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-[#F1EFE7] mb-2">
                                {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </label>
                            <input
                                type={field === 'password' ? 'password' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-[#2B2B2B] bg-[#F1EFE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F1EFE7] focus:ring-opacity-50"
                                required
                            />
                        </div>
                    ))}
                    <motion.button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-[#2B2B2B] bg-[#F1EFE7] rounded-full hover:bg-opacity-90 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Sign Up
                    </motion.button>
                </form>
                <p className="mt-4 text-sm text-center text-[#F1EFE7] opacity-80">
                    Already have an account? <a href="/login" className="underline">Login</a>
                </p>
            </motion.div>
        </section>
    );
};

export default SignUp;