'use client';
import React from 'react';
import Loader from './Loader/Loader';
import { useAuth } from './AuthContext';

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  if (loading) return <Loader />;
  return <>{children}</>;
};

export default AuthGate; 