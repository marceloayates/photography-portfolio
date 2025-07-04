import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminSession');
    if (adminSession === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    // For development - use environment variables
    if (process.env.NODE_ENV === 'development') {
      const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
      const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

      if (username === adminUsername && password === adminPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminSession', 'authenticated');
        return true;
      }
      return false;
    }

    // For production - use secure hash comparison
    // Replace these hashed values with your actual credentials
    const validCredentials = [
      {
        username: 'admin',
        passwordHash: 'd227bae1e1a52510b49c1f9ebcddaffc9accd2c6ee029515616e56c77f415c71'
      }
    ];

    // Simple hash function (you can use crypto.subtle.digest in modern browsers)
    const simpleHash = async (text) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    // Check credentials
    return simpleHash(password).then(hashedPassword => {
      const validUser = validCredentials.find(cred =>
        cred.username === username && cred.passwordHash === hashedPassword
      );

      if (validUser) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminSession', 'authenticated');
        return true;
      }
      return false;
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminSession');
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
