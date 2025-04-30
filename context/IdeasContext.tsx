import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Idea } from '@/types/Idea';

type IdeasContextType = {
  ideas: Idea[];
  addIdea: (idea: Idea) => void;
  updateIdea: (idea: Idea) => void;
};

const IdeasContext = createContext<IdeasContextType | undefined>(undefined);

export const IdeasProvider = ({ children }: { children: ReactNode }) => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const addIdea = (idea: Idea) => {
    setIdeas((prevIdeas) => [...prevIdeas, idea]);
  };

  const updateIdea = (updatedIdea: Idea) => {
    setIdeas(prevIdeas =>
      prevIdeas.map(idea => (idea.id === updatedIdea.id ? updatedIdea : idea))
    );
  };


  return (
    <IdeasContext.Provider value={{ ideas, addIdea , updateIdea}}>
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error('useIdeas must be used within an IdeasProvider');
  }
  return context;
};
