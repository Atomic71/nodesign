import {
  getSavedTheme,
  hasUserSavedTheme,
  isBrowserInDarkMode,
  saveTheme,
  shouldInitInDarkMode,
} from './theme';

export const setThemeToDcument = (theme: string) => {
  document.documentElement.classList.add(theme);
};

export const removeThemeFromDocument = (theme: string) => {
  document.documentElement.classList.remove(theme);
};

export const getThemeToggleButtons = (key: string) => {
  const lightIconKey = `theme-toggle-light-icon-${key}`;
  const darkIconKey = `theme-toggle-dark-icon-${key}`;
  const themeToggleBtnKey = `theme-toggle-${key}`;
  const themeToggleDarkIcon = document.getElementById(darkIconKey);
  const themeToggleLightIcon = document.getElementById(lightIconKey);
  const themeToggleBtn = document.getElementById(themeToggleBtnKey);

  if (!themeToggleDarkIcon || !themeToggleLightIcon || !themeToggleBtn) {
    throw new Error('Theme toggle icons not found');
  }

  return {
    themeToggleDarkIcon,
    themeToggleLightIcon,
    themeToggleBtn,
  };
};

const applyDarkTheme = () => {
  setThemeToDcument('dark');
  saveTheme('dark');

  removeThemeFromDocument('light');
};
const applyLightTheme = () => {
  setThemeToDcument('light');
  saveTheme('light');

  removeThemeFromDocument('dark');
};

const toggleTheme = (theme: 'light' | 'dark') => {
  if (theme === 'light') {
    applyLightTheme();
  } else {
    applyDarkTheme();
  }
};

export const initThemeToggle = (key: string) => {
  const { themeToggleDarkIcon, themeToggleLightIcon } =
    getThemeToggleButtons(key);

  const shouldInitDark = shouldInitInDarkMode();

  console.log('shouldInitDark', shouldInitDark);
  // Change the icons inside the button based on previous settings
  if (shouldInitDark) {
    themeToggleLightIcon.classList.remove('hidden');
  } else {
    themeToggleDarkIcon.classList.remove('hidden');
  }
};

export function toggleThemeProcedure(event: HTMLElementEventMap['click']) {
  console.log('toggleThemeProcedure');
  console.log(event);
  console.log(event.target);
  if (event.target) {
    console.log((event.target as HTMLButtonElement)?.getAttribute('data-key'));
  }
  // toggle icons inside button
  return;
  const { themeToggleDarkIcon, themeToggleLightIcon } =
    getThemeToggleButtons(key);

  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  const hasUserSaved = hasUserSavedTheme();

  const shouldApplyLightThemeNext =
    (!hasUserSaved && isBrowserInDarkMode()) || getSavedTheme() === 'dark';

  toggleTheme(shouldApplyLightThemeNext ? 'light' : 'dark');
}
