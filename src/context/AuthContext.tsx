
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth, LoginCredentials, RegisterData } from '@/hooks/useAuth';

// La data que se espera de la respuesta de autenticación
interface AuthResponse {
  token: string;
  // Se puede extender con datos del usuario si la API los devuelve
  // user: { id: string; name: string; email: string; };
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (data: LoginCredentials) => Promise<any>;
  register: (data: RegisterData) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const { login: loginMutation, isLoggingIn, register: registerMutation, isRegistering } = useAuth();

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (data: LoginCredentials) => {
    try {
      const response = await loginMutation(data);
      const newToken = response?.token; // Adjust based on actual API response
      if (newToken) {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      }
      return response;
    } catch (error) {
      console.error('Login failed in context', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await registerMutation(data);
      // Handle post-registration logic, e.g., auto-login
      return response;
    } catch (error) {
      console.error('Registration failed in context', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      token,
      login,
      register,
      logout,
      isLoading: isLoggingIn,
      isRegistering
    }}>
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
