
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '@/lib/api';

// La data que se espera de la respuesta de autenticación
interface AuthResponse {
  token: string;
  // Se puede extender con datos del usuario si la API los devuelve
  // user: { id: string; name: string; email: string; };
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const isAuthenticated = !!token;

  // Función para establecer el estado de autenticación
  // Ya no es asíncrona ni maneja lógica de API
  const setAuth = (data: AuthResponse) => {
    const { token: newToken } = data;
    setToken(newToken);
    localStorage.setItem('token', newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  // Efecto para inicializar el estado desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, setAuth, logout }}>
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
