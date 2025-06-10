import React, { createContext, useEffect, useState } from 'react';
import { Types } from './types';

interface Context {
  buildings: Types | null;
  setBuildings: React.Dispatch<React.SetStateAction<Types | null>>;
}

export const BuildingsContext = createContext<Context>({
  buildings: null,
  setBuildings: () => {},
});

export const BuildingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buildings, setBuildings] = useState<Types | null>(null);

  useEffect(() => {
    fetch('/buildings')
      .then(res => res.json())
      .then(data => setBuildings(data))
      .catch(err => console.error('Failed to fetch buildings', err));
  }, []);

  return (
    <BuildingsContext.Provider value={{ buildings, setBuildings }}>
      {children}
    </BuildingsContext.Provider>
  );
};
