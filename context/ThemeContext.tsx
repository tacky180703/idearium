import { createContext, useContext } from 'react';

// ダークテーマ固定
export const defaultTheme = {
  background: '#15202b',
  primary: '#27323c',
  secondary: '#3b454c',
  textPrimary: '#f2f4ff',
  textSecondary: '#7f8c99',
  accent: '#d5ff5f',
};

// 【ここ！】Contextの型をちゃんとdefaultThemeに合わせる
export const ThemeContext = createContext<typeof defaultTheme>(defaultTheme);

// 使いやすくするhook
export const useTheme = () => useContext(ThemeContext);
