import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-100 dark:bg-dark-300 
        hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
} 