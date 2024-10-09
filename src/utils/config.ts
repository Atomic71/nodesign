export const languages = ['bs', 'en'] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'bs';

export const languageNames: Record<Language, string> = {
  bs: 'Bosanski',
  en: 'English',
};
