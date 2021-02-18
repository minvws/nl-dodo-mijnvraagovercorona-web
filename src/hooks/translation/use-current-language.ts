import { languages } from 'config/languages';
import { useContext } from 'react';
import { TranslationContext } from './translation-context';

export const useCurrentLanguage = () => {
	const currentLanguageId = useContext(TranslationContext).locale;
	return (
		languages.find((lang) => lang.id === currentLanguageId) || languages[0]
	);
};
