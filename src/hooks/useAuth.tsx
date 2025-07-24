import React, { useState, createContext, useContext } from 'react';
import { apiClient } from '@/services/apiClient';
import { AuthResponse } from '@/types/auth';

interface AuthCtx {
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthed, setAuthed] = useState(!!localStorage.getItem('authToken'));

  const login = async (email: string, password: string) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    localStorage.setItem('authToken', data.token.token);
    setAuthed(true);
  };

  const logout = () => {
    // We can also make an API call to the backend's /logout endpoint for a more robust logout
    apiClient.post('/auth/logout').finally(() => {
        localStorage.removeItem('authToken');
        setAuthed(false);
    })
  };

  return <AuthContext.Provider value={{ isAuthed, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};