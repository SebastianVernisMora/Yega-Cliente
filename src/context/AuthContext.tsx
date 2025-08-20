
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isRegistering: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const isAuthenticated = !!token;

  const login = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulación de llamada a la API
      const response = await new Promise<{ data: { token: string } }>(resolve => {
        setTimeout(() => {
          resolve({ data: { token: 'fake-jwt-token' } });
        }, 1000);
      });
      
      const { token: newToken } = response.data;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsRegistering(true);
    try {
      // Simulación de llamada a la API
      await new Promise<void>(resolve => {
        setTimeout(() => {
          console.log('User registered with:', data);
          resolve();
        }, 1500);
      });
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, register, logout, isLoading, isRegistering }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
