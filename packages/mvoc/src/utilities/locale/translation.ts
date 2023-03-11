import { isExternalUrl } from '../helpers/external-url';

export enum Locales {
	Dutch = 'nl',
	English = 'en',
	// Polish = 'pl',
}

export interface Locale {
	id: Locales;
	fullName: string;
	shortName: string;
	urlPrefix: string;
	locale: string;
}

export const locales: { [key: string]: Locale } = {
	dutch: {
		id: Locales.Dutch,
		fullName: 'Nederlands',
		shortName: 'Nl',
		urlPrefix: '/nl',
		locale: 'nl_nl',
	},
	english: {
		id: Locales.English,
		fullName: 'English',
		shortName: 'En',
		urlPrefix: '/en',
		locale: 'en_gb',
	},
	// polish: {
	// 	id: Locales.Polish,
	// 	fullName: 'Polish',
	// 	shortName: 'Pl',
	// 	urlPrefix: '/pl',
	// 	locale: 'pl_pl',
	// },
};

export const availableLocales = [
	locales.dutch,
	locales.english,
	// locales.polish,
];

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\/?/;
export const getLocaleFromURL = (pathname: string) => {
	const langCodeMatch = pathname.match(langPathRegex);
	const langCode = langCodeMatch ? langCodeMatch[1] : 'nl';
	return availableLocales.filter((locale) => locale.id === langCode)[0];
};

/**
 * Small helper method that prefixes the requested url with a locale.
 */
export const prefixUrlWithlocale = (href: string, locale: Locale) =>
	availableLocales.filter((locale) => href.includes(locale.urlPrefix))
		.length === 0 &&
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
