import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../services/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);
      
      if (token) {
        setAuthToken(token);
        try {
          console.log('Fetching user data...');
          const response = await api.get('accounts/auth/me/');
          console.log('User data response:', response.data);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          handleAuthError();
        }
      } else {
        console.log('No token found in localStorage');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleAuthError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setAuthToken(null);
    setUser(null);
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('accounts/auth/login/', { username, password });
      const { access, refresh, user } = response.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      setAuthToken(access);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('accounts/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleAuthError();
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('accounts/auth/signup/', userData);
      const { access, refresh, user } = response.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh_token', refresh);
      setAuthToken(access);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};