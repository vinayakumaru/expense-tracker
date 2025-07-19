import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, PaletteMode, Theme } from '@mui/material';
import { teal, brown } from '@mui/material/colors';

interface ModeCtx {
  mode: PaletteMode;
  toggle: () => void;
  theme: Theme;
}

const ColorModeContext = createContext<ModeCtx | null>(null);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const toggle = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: teal,
          secondary: brown,
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggle, theme }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorModeTheme = () => {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error('useColorModeTheme must be used within a ColorModeProvider');
  return ctx;
};