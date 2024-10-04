import { useState } from 'react';

export const useTheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newScheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newScheme);
  };

  return { toggleTheme, colorScheme };
};