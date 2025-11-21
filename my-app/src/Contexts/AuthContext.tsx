import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../Services/api';

interface AuthContextType {
  token: string | null;
  userType: string | null;
  signIn: (email: string, senha: string) => Promise<boolean>;
  signOut: () => void;
  restoreToken: (token: string | null, userType: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const signIn = async (email: string, senha: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/signin', { email, senha });
      const { token: newToken, userTipo }: any = response.data; 
      setToken(newToken);
      setUserType(userTipo);
      await SecureStore.setItemAsync('userToken', newToken);
      await SecureStore.setItemAsync('userType', String(userTipo));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signOut = async () => {
    setToken(null);
    setUserType(null);
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userType');
  };

  const restoreToken = (token: string | null, userType: string | null) => {
    setToken(token);
    setUserType(userType);
  };

  return (
    <AuthContext.Provider value={{ token, userType, signIn, signOut, restoreToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
