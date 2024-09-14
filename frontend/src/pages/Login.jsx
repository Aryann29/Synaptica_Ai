import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const success = await login(username, password);
            if (success) {
                console.log(success);
                navigate('/');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                times: [0, 1],
                repeat: Infinity,
              }}
              className="w-10 h-10 border-4 border-[#F1EFE7] border-t-transparent rounded-full"
            />
            <p className="mt-4 text-[#F1EFE7]">Loading...</p>
          </div>
        </div>
    );

    return (
        <section className="h-screen flex justify-center bg-[#2B2B2B] px-4 mt-32">
            <motion.div 
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center text-[#F1EFE7] mb-8">
                    Login to Synaptica
                </h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-[#F1EFE7] mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 text-[#2B2B2B] bg-[#F1EFE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F1EFE7] focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#F1EFE7] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 text-[#2B2B2B] bg-[#F1EFE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F1EFE7] focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <motion.button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-[#2B2B2B] bg-[#F1EFE7] rounded-full hover:bg-opacity-90 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login
                    </motion.button>
                </form>
                <p className="mt-4 text-sm text-center text-[#F1EFE7] opacity-80">
                    Don't have an account? <a href="/signup" className="underline">Sign up</a>
                </p>
            </motion.div>
        </section>
    );
};

export default Login;