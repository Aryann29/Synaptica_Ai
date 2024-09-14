// src/App.js
import React from 'react'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AboutUs from './pages/About'
import Experts from './pages/Experts'
import Settings from './pages/Settings'
import HowItWorks from './pages/Howitworks'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import SignUP from './pages/Signup'
import ChatWithExpert from './pages/Chatbox'
import MyExpert from './pages/MyExpert';
import CreateExpert from './components/CreateExpert'

const App = () => {

  return (
    <AuthProvider>
      <Router>
      <div className="bg-[#2B2B2B] min-h-screen">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/myexperts" element={<MyExpert />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/howit" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-expert" element={<CreateExpert />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/chat/:id" element={<ChatWithExpert />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
      </Router>
    </AuthProvider>
  );
};

export default App;