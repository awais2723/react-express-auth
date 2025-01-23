import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');  // Get token from localStorage
      if (token) {
        console.log('got token', token);
        try {
          // Send token in Authorization header to verify token
          const response = await axiosInstance.get('/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('user authenticated');
          setIsAuthenticated(response.data.success); // Check if user is authenticated
        } catch (error) {
          console.log('not authenticated');
          setIsAuthenticated(false);  // If token is invalid or expired
        }
      } else {
        setIsAuthenticated(false);  // No token found
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;  // Waiting for response
  }

  return isAuthenticated ? children : <Navigate to="/login" />;  // Redirect if not authenticated
};

export default ProtectedRoute;
