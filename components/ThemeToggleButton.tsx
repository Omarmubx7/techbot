"use client";
import * as React from 'react';
import { ThemeContext } from './theme-provider';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 1000,
        background: theme === 'dark' ? '#23232b' : '#fff',
        color: theme === 'dark' ? '#FF6384' : '#C70039',
        border: '1.5px solid #C70039',
        borderRadius: '50%',
        width: 48,
        height: 48,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        fontSize: 22,
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton; 