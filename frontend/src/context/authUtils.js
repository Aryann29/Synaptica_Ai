import api from '../services/Api';

// Set the Authorization header for API requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Handle authentication errors by clearing tokens and user data
export const handleAuthError = (setUser) => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  setAuthToken(null);
  setUser(null);
  window.location.href = '/login'; // Adjust this to your login route
};

// Refresh the access token using the refresh token
export const refreshToken = async (setUser) => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const response = await api.post('accounts/auth/refresh/', { refresh: refreshToken });
      const { access } = response.data;
      localStorage.setItem('token', access);
      setAuthToken(access);
      return true;
    } else {
      handleAuthError(setUser);
      return false;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    handleAuthError(setUser);
    return false;
  }
};
