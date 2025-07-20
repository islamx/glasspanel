'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import pb from '@/lib/pb';

interface AuthContextType {
  user: any;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(pb.authStore.model);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
      setIsLoggedIn(pb.authStore.isValid);
      setLoading(false);
    });
    // Initial state
    setUser(pb.authStore.model);
    setIsLoggedIn(pb.authStore.isValid);
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    await pb.collection('users').authWithPassword(email, password);
    setUser(pb.authStore.model);
    setIsLoggedIn(pb.authStore.isValid);
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    pb.authStore.clear();
    setUser(null);
    setIsLoggedIn(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 