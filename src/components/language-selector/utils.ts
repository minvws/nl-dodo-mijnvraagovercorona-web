import { useMemo } from 'react';
import { Language } from './language-selector';

export const useCurrentLangage = (path: string = '', languages: Language[]) => {
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
	/**
	 * Requested language
	 */
	language: Language,
	/**
	 * Language page is currently viewed in
	 */
	currentLanguage: Language,
) => {
	// If current page is only '/', replace it with the url prefix.
	// This makes the '/' homepage also redirect to '/nl'
	return path === '/'
		? language.urlPrefix
		: path.replace(currentLanguage.urlPrefix, language.urlPrefix);
};
