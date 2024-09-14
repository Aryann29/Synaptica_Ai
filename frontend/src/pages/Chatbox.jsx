import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../services/Api';
const formatMessage = (text) => {
    const parts = text.split('*');
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return <strong key={index}>{part}</strong>;
        }
        return part;
    });
};

const ChatWithExpert = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [expertPrompt, setExpertPrompt] = useState('');
    const [isEditingPrompt, setIsEditingPrompt] = useState(false);
    const [expert, setExpert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        fetchExpertDetails();
    }, [id]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchExpertDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://synaptica-backend.vercel.app/api/experts/${id}/`);
            setExpert(response.data);
            setExpertPrompt(response.data.prompt);
            setMessages([{ text: "Welcome! How can I assist you today?", sender: 'expert', isTyping: false }]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching expert details:', error);
            setError('Failed to load expert details. Please try again later.');
            setLoading(false);
        }
    };

    const typeEffect = (text, messageIndex) => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                setMessages(prev => prev.map((msg, index) => 
                    index === messageIndex 
                        ? { ...msg, displayedText: text.substring(0, i + 1), isTyping: true }
                        : msg
                ));
                i++;
            } else {
                clearInterval(typing);
                setMessages(prev => prev.map((msg, index) => 
                    index === messageIndex 
                        ? { ...msg, isTyping: false }
                        : msg
                ));
            }
        }, 20);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '') {
            setMessages(prev => [...prev, { text: inputMessage, sender: 'user', isTyping: false }]);
            setInputMessage('');

            try {
                const response = await axios.post(`https://synaptica-backend.vercel.app/api/chat/${id}/`, {
                    message: inputMessage
                });
                const newMessageIndex = messages.length + 1;
                setMessages(prev => [...prev, { text: response.data.answer, sender: 'expert', isTyping: true, displayedText: '' }]);
                typeEffect(response.data.answer, newMessageIndex);
            } catch (error) {
                console.error('Error sending message:', error);
                setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request. Please try again.", sender: 'expert', isTyping: false }]);
            }
        }
    };

    const handleEditPrompt = () => {
        setIsEditingPrompt(true);
    };

    const handleSavePrompt = async () => {
        try {
            await axios.patch(`https://synaptica-backend.vercel.app/api/experts/${id}/update_prompt/`, {
                prompt: expertPrompt
            });
            setIsEditingPrompt(false);
            setMessages([{ text: "Hello! How can I help you today?", sender: 'expert', isTyping: false }]);
        } catch (error) {
            console.error('Error updating prompt:', error);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] p-4 flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] p-4 flex items-center justify-center">{error}</div>;
    if (!expert) return <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] p-4 flex items-center justify-center">Expert not found</div>;

    return (
        <div className="min-h-screen bg-[#2B2B2B] text-[#F1EFE7] p-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Chat with an Expert</h1>
                
                <div className="bg-[#3A3A3A] p-4 rounded-lg mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={expert.image} alt={expert.name} className="w-16 h-16 rounded-full mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">{expert.name}</h2>
                            <p className="text-[#F1EFE7] opacity-80">{expert.field}</p>
                        </div>
                    </div>
                    <motion.button
                        onClick={handleEditPrompt}
                        className="bg-[#F1EFE7] text-[#2B2B2B] px-4 py-2 rounded-lg font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Edit Prompt
                    </motion.button>
                </div>

                {isEditingPrompt && (
                    <div className="mb-4">
                        <textarea
                            value={expertPrompt}
                            onChange={(e) => setExpertPrompt(e.target.value)}
                            className="w-full p-2 rounded-lg bg-[#3A3A3A] text-[#F1EFE7] focus:outline-none"
                            rows="4"
                        />
                        <motion.button
                            onClick={handleSavePrompt}
                            className="mt-2 bg-[#F1EFE7] text-[#2B2B2B] px-4 py-2 rounded-lg font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Save Prompt
                        </motion.button>
                    </div>
                )}

                <motion.div 
                    ref={chatBoxRef}
                    className="bg-[#3A3A3A] p-4 rounded-lg mb-4 h-96 overflow-y-auto scrollbar-custom"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {messages.map((message, index) => (
                        <motion.div 
                            key={index}
                            className={`mb-2 flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {message.sender !== 'user' && (
                                <img src={expert.image} alt={expert.name} className="w-6 h-6 rounded-full bg-[#4f4f4f] border-white mr-2" />
                            )}
                            <span className={`inline-block p-3 rounded-lg ${
                                message.sender === 'user' 
                                    ? 'bg-[#4A4A4A] text-[#F1EFE7]' 
                                    : 'bg-[#F1EFE7] text-[#2B2B2B]'
                            }`}>
                                <pre className="whitespace-pre-wrap font-sans text-inherit">
                                    {formatMessage(message.isTyping ? message.displayedText : message.text)}
                                </pre>
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                <form onSubmit={handleSendMessage} className="flex">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-grow p-2 rounded-l-lg bg-[#3A3A3A] text-[#F1EFE7] focus:outline-none"
                        placeholder="Type your message here..."
                    />
                    <motion.button
                        type="submit"
                        className="bg-[#F1EFE7] text-[#2B2B2B] px-4 py-2 rounded-r-lg font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Send
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default ChatWithExpert;