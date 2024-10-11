export const getSavedTheme = () => {
  return localStorage.getItem('theme');
};

export const saveTheme = (theme: string) => {
  localStorage.setItem('theme', theme);
};

export const hasUserSavedTheme = () => {
  return getSavedTheme() !== null;
};

export const isBrowserInDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const shouldInitInDarkMode = () => {
  return (
    (isBrowserInDarkMode() && !hasUserSavedTheme()) ||
    getSavedTheme() === 'dark'
  );
};
