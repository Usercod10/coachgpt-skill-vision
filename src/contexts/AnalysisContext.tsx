
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnalysisData {
  jobId: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  reportData: any;
}

interface AnalysisContextType {
  analysisData: AnalysisData;
  setAnalysisData: (data: Partial<AnalysisData>) => void;
  resetAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysisData, setAnalysisState] = useState<AnalysisData>({
    jobId: null,
    status: 'pending',
    reportData: null,
  });

  const setAnalysisData = (data: Partial<AnalysisData>) => {
    setAnalysisState(prev => ({ ...prev, ...data }));
  };

  const resetAnalysis = () => {
    setAnalysisState({
      jobId: null,
      status: 'pending',
      reportData: null,
    });
  };

  return (
    <AnalysisContext.Provider value={{ analysisData, setAnalysisData, resetAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
