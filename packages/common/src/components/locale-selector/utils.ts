import type { Locale } from '@quarantaine/common';

export const getCurrentUrlForLocale = (
	path: string,
	/**
	 * Requested locale
	 */
	locale: Locale,
	/**
	 * Locale page is currently viewed in
	 */
	currentLocale: Locale,
) => {
	// If current page is only '/', replace it with the url prefix.
	// This makes the '/' homepage also redirect to '/nl'
	return path === '/'
		? locale.urlPrefix
		: path.replace(currentLocale.urlPrefix, locale.urlPrefix);
};
