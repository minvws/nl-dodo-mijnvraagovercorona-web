import { isExternalUrl } from '../helpers/external-url';
import { availableLocales, type Locale } from '@dodo/ui/helpers';
export {
	locales,
	availableLocales,
	type Locale,
	Locales,
	getLocaleFromURL,
} from '@dodo/ui/helpers';

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
