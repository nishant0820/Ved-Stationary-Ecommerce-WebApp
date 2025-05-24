import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const register = (userData) => {
    // In a real app, you would send this to your backend
    // For now, we'll just simulate a successful registration
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      isAdmin: userData.email === 'admin@vedstationary.com' // Simple admin check
    };
    setUser(newUser);
    return newUser;
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};