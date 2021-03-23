import { useContext } from 'react';
import { TranslationContext } from './translation-context';

export const useCurrentLocale = () => {
	const { locale: currentLocale, locales } = useContext(TranslationContext);

	return locales.find((locale) => locale.id === currentLocale) || locales[0];
};
