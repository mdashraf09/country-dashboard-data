// contexts/ThemeContext.tsx
'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import Home from '../page';


const ThemeContext = createContext('light');

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as Theme | null;
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('theme', theme);
//     document.documentElement.setAttribute('data-theme', theme);
//   }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  const contextValue: any = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={ contextValue }>
      <Home />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };
