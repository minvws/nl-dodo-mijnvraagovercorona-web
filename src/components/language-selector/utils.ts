import { useMemo } from 'react';
import { Language } from './language-selector';

export const useCurrentLangage = (path: string, languages: Language[]) => {
	const language = useMemo(
		() =>
			languages.find(
				(language) =>
					language.urlPrefix !== '' && path.startsWith(language.urlPrefix),
			) ?? languages[0],
		[path],
	);

	return language;
};

export const getCurrentUrlForLanguage = (
	path: string,
	language: Language,
	currentLanguage: Language,
) => path.replace(currentLanguage.urlPrefix, language.urlPrefix);
