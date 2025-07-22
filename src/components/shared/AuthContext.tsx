'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import pb from '@/lib/pb';

interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  mobile: string;
  gender: string;
  created: string;
  updated: string;
}

interface UserData {
  name: string;
  mobile: string;
  gender: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: UserData) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(pb.authStore.model as User | null);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial state
    setUser(pb.authStore.model as User | null);
    setIsLoggedIn(pb.authStore.isValid);
    setLoading(false);

    // Listen for auth changes
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model as User | null);
      setIsLoggedIn(pb.authStore.isValid);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await pb.collection('users').authWithPassword(email, password);
      setUser(pb.authStore.model as User | null);
      setIsLoggedIn(pb.authStore.isValid);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: UserData) => {
    setLoading(true);
    try {
      const user = await pb.collection('users').create(userData);
      return user as unknown as User;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    try {
      pb.authStore.clear();
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, signup, logout }}>
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