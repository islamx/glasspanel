'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import pb from '@/lib/pb';

interface AuthContextType {
  user: any;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(pb.authStore.model);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
      setIsLoggedIn(pb.authStore.isValid);
    });
    // Initial state
    setUser(pb.authStore.model);
    setIsLoggedIn(pb.authStore.isValid);
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await pb.collection('users').authWithPassword(email, password);
    setUser(pb.authStore.model);
    setIsLoggedIn(pb.authStore.isValid);
  };

  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
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