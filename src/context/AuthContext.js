import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import { 
  getTokenFromStorage, 
  setTokenInStorage, 
  removeTokenFromStorage,
  validateEmail,
  validatePassword 
} from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getTokenFromStorage();
      
      if (token) {
        try {
          // Verify token with backend
          const response = await apiService.verifyToken();
          if (response.success) {
            setUser(response.data.user);
          } else {
            // Clear invalid token
            removeTokenFromStorage();
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // Clear invalid token
          removeTokenFromStorage();
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Validate input
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password) {
        throw new Error('Password is required');
      }

      // Call backend API
      const response = await apiService.login({ email, password });
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store token and user data
        setTokenInStorage(token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        return { success: true, user };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Validate input
      if (!name.trim()) {
        throw new Error('Name is required');
      }
      
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors[0]);
      }

      // Call backend API
      const response = await apiService.register({
        name: name.trim(),
        email: email.toLowerCase(),
        password
      });
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store token and user data
        setTokenInStorage(token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        return { success: true, user };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await apiService.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local storage and state
      removeTokenFromStorage();
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};