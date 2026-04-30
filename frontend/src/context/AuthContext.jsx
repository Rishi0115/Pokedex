import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Check if we have a token in the URL (coming back from Google OAuth)
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          // Decode the base64 token to get user data
          const userData = JSON.parse(atob(token));
          setUser(userData);
          localStorage.setItem('pokedex_user', JSON.stringify(userData));
          // Clean the URL so the token isn't visible
          window.history.replaceState({}, document.title, window.location.pathname);
          return;
        }

        // 2. Check localStorage for persisted user
        const savedUser = localStorage.getItem('pokedex_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          return;
        }

        // 3. Fall back to session cookie check (works on localhost)
        const res = await authApi.getMe();
        if (res.data.success) {
          setUser(res.data.data);
          localStorage.setItem('pokedex_user', JSON.stringify(res.data.data));
        }
      } catch (err) {
        // Not authenticated — that's fine
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/auth/google`;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
    localStorage.removeItem('pokedex_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
