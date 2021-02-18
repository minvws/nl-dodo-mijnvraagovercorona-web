import { Language } from 'config/languages';

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
