import { useContext } from 'react';
import { TranslationContext } from './translation-context';
import { Locale } from './locales';

export const useCurrentLocale = (): Locale => {
	const { locale: currentLocale, locales } = useContext(TranslationContext);
	return locales.find((locale) => locale.id === currentLocale) || locales[0];
};
