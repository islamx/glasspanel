'use client';
import React, { useState, useEffect } from 'react';
import Loader from './Loader/Loader';
import { useAuth } from './AuthContext';

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Only show loader during initial app load
    if (!loading) {
      setInitialLoading(false);
    }
  }, [loading]);

  // Only show loader during initial authentication check
  if (initialLoading && loading) {
    return <Loader />;
  }
  
  return <>{children}</>;
};

export default AuthGate; 