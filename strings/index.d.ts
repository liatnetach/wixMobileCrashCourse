import strings from './messages_en.json';
export type TranslationKey = keyof typeof strings;
export function i18n(key: TranslationKey, params?: object): string;
export function getLocale(): string;
export function __setLocale(locale: string): void;
export function getLanguagesList(): any;
export function getLanguagesListItemLabel(item: any): string;
