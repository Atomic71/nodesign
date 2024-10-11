import {
  getSavedTheme,
  hasUserSavedTheme,
  isBrowserInDarkMode,
  saveTheme,
} from './theme';

const isDarkThemeApplied = () => {
  return document.documentElement.classList.contains('dark');
};
const isMainHeaderScrolled = () => {
  return document.getElementById('main-header')?.classList.contains('scrolled');
};

export const setThemeToDcument = (theme: string) => {
  document.documentElement.classList.add(theme);
};
export const changeBrandIcon = () => {
  const brandIcon = document.getElementById('nodesign-brand-logo');

  const isDarkCurrent = isDarkThemeApplied();
  const isHeaderScrolled = isMainHeaderScrolled();

  if (isHeaderScrolled && isDarkCurrent) {
    brandIcon?.setAttribute('src', '/icons/nodesign-brand-light.svg');
  }
};

export const removeThemeFromDocument = (theme: string) => {
  document.documentElement.classList.remove(theme);
};

const applyDarkTheme = () => {
  setThemeToDcument('dark');
  saveTheme('dark');
  changeBrandIcon();
  removeThemeFromDocument('light');
};
const applyLightTheme = () => {
  setThemeToDcument('light');
  saveTheme('light');
  removeThemeFromDocument('dark');
  changeBrandIcon();
};

const toggleTheme = (theme: 'light' | 'dark') => {
  if (theme === 'light') {
    applyLightTheme();
  } else {
    applyDarkTheme();
  }
};

export function toggleThemeProcedure(event: HTMLElementEventMap['click']) {
  const hasUserSaved = hasUserSavedTheme();
  const shouldApplyLightThemeNext =
    (!hasUserSaved && isBrowserInDarkMode()) || getSavedTheme() === 'dark';
  toggleTheme(shouldApplyLightThemeNext ? 'light' : 'dark');
}
