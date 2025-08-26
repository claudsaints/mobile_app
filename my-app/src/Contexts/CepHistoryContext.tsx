// src/contexts/CepHistoryContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CepInfo } from '../types';

interface CepHistoryContextType {
  history: CepInfo[];
  addToHistory: (cep: CepInfo) => void;
}

const CepHistoryContext = createContext<CepHistoryContextType | undefined>(undefined);

export const CepHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<CepInfo[]>([]);

  const addToHistory = (cep: CepInfo) => {
    setHistory(prev => [...prev, cep]);
  };

  return (
    <CepHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </CepHistoryContext.Provider>
  );
};

export const useCepHistory = (): CepHistoryContextType => {
  const context = useContext(CepHistoryContext);
  if (!context) {
    throw new Error('useCepHistory deve ser usado dentro de CepHistoryProvider');
  }
  return context;
};
