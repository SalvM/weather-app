const base = {
  /* NATURALS */
  white: '#fff',
  black: '#000',
  light: '#eee',
  dark: '#333',
  lightGrey: '#a0a0a0',
  darkGrey: '#3a3a3a',
  warning: '#cc7f03',
  error: '#cc242c',
};

/* THEMES */
const solar = {
  primary: '#f9b641',
  secondary: '#f39f85',
  tertiary: '#a34054',
  fourth: '#473430',
  fifth: '#23451f',
  lightPrimary: '#f9f2dc',
};

const themes = {
  solar,
};

const themeSelected = 'solar';

const colors = {...base, ...themes[themeSelected]};
export default colors;
