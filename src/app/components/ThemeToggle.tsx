'use client'
// components/ThemeToggle.tsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    //const theme = useTheme();
    const [theme, setTheme] = useState('light');

    console.log("theme is",theme)

    return (
        <button
            // onClick={toggleTheme}
            onClick={() => {
                const newTheme = theme === 'light' ? 'dark' : 'light';
                setTheme(newTheme)
            }}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
};

export default ThemeToggle;
