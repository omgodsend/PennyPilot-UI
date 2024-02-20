// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));

  const login = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};