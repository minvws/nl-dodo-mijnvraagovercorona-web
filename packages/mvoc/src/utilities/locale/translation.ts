import { isExternalUrl } from '../helpers/external-url';
import { availableLocales, type Locale } from '@mvoc/ui/helpers';
export {
	locales,
	availableLocales,
	type Locale,
	Locales,
	getLocaleFromURL,
} from '@mvoc/ui/helpers';

/**
 * Small helper method that prefixes the requested url with a locale.
 */
export const prefixUrlWithlocale = (href: string, locale: Locale) =>
	// check if href aready contains a available locale
	availableLocales.filter(
		(localeTest) =>
			href === localeTest.id || href.startsWith(localeTest.urlPrefix),
	).length === 0 &&
	!isExternalUrl(href) &&
	!href.startsWith('#') &&
	!href.startsWith('tel:') &&
	!href.startsWith('mailto:')
		? `${locale.urlPrefix}/${href.replace(/^\//, '')}`
		: href;

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
