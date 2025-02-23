import React, { createContext, useState, ReactNode } from 'react';


interface FontSizeContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}


export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 16,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
});

interface FontSizeProviderProps {
  children: ReactNode; 
}


export const FontSizeProvider = ({ children }: FontSizeProviderProps) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(prevSize => Math.min(prevSize + 2, 32)); 
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};