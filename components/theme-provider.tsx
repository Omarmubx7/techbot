"use client";
import * as React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use light theme
  React.useEffect(() => {
    document.body.classList.remove('dark');
    // Optionally, clear any stored theme
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme');
    }
  }, []);

  // toggleTheme does nothing now
  const toggleTheme = React.useCallback(() => {}, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};