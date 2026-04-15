import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';
import apiClient from '../api/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  // Signup function
  const signup = async (email, password, fullName, role = 'citizen') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get Firebase token
    const token = await user.getIdToken();

    setAuthToken(token);

    try {
      await apiClient.post('/auth/register-profile', {
        uid: user.uid,
        email: user.email,
        fullName,
        role
      });
    } catch (error) {
      const existingProfile = await fetchUserProfile(token);

      if (!existingProfile && error.response?.status !== 409) {
        throw error;
      }
    }

    const profile = await fetchUserProfile(token);
    
    return {
      user,
      profile: profile || {
        uid: user.uid,
        email: user.email,
        fullName,
        role
      }
    };
  };

  // Login function
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = () => {
    setUserProfile(null);
    setAuthToken(null);
    return signOut(auth);
  };

  // Fetch user profile from backend
  const fetchUserProfile = async (token) => {
    try {
      const response = await apiClient.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserProfile(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUserProfile(null);
      return null;
    }
  };

  // Update user profile
  const updateProfile = async (data) => {
    try {
      const response = await apiClient.patch('/auth/profile', data, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setUserProfile(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get Firebase ID token
          const token = await user.getIdToken();
          setAuthToken(token);
          
          // Set default authorization header
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user profile
          await fetchUserProfile(token);
        } catch (error) {
          console.error('Error setting up auth:', error);
          setAuthToken(null);
          setUserProfile(null);
        }
      } else {
        setAuthToken(null);
        setUserProfile(null);
        delete apiClient.defaults.headers.common['Authorization'];
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Refresh token periodically
  useEffect(() => {
    if (!currentUser) return;

    const refreshToken = async () => {
      try {
        const token = await currentUser.getIdToken(true);
        setAuthToken(token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    };

    // Refresh token every 50 minutes (tokens expire after 1 hour)
    const interval = setInterval(refreshToken, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const value = {
    currentUser,
    userProfile,
    authToken,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser,
    isAdmin: userProfile?.role === 'admin',
    isCitizen: userProfile?.role === 'citizen'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
