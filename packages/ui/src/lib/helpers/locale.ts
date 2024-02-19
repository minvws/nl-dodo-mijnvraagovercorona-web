export enum Locales {
	Dutch = 'nl',
	English = 'en',
	Turkish = 'tr',
	Polish = 'pl',
	Arabic = 'ar',
	Ukrainian = 'ua',
}

export interface Locale {
	id: Locales;
	fullName: string;
	shortName: string;
	dutchName: string;
	urlPrefix: string;
	locale: string;
	hreflang: string;
	direction: 'ltr' | 'rtl';
}

export const locales: { [key: string]: Locale } = {
	dutch: {
		id: Locales.Dutch,
		fullName: 'Nederlands',
		shortName: 'Nl',
		dutchName: 'Nederlands',
		urlPrefix: '/nl',
		locale: 'nl_nl',
		hreflang: 'nl',
		direction: 'ltr',
	},
	english: {
		id: Locales.English,
		fullName: 'English',
		shortName: 'En',
		dutchName: 'Engels',
		urlPrefix: '/en',
		locale: 'en_gb',
		hreflang: 'en',
		direction: 'ltr',
	},
	turkish: {
		id: Locales.Turkish,
		fullName: 'Türkçe',
		shortName: 'TR',
		dutchName: 'Turks',
		urlPrefix: '/tr',
		locale: 'tr_tr',
		hreflang: 'tr',
		direction: 'ltr',
	},
	polish: {
		id: Locales.Polish,
		fullName: 'Polski',
		shortName: 'Pl',
		dutchName: 'Pools',
		urlPrefix: '/pl',
		locale: 'pl_pl',
		hreflang: 'pl',
		direction: 'ltr',
	},
	arabic: {
		id: Locales.Arabic,
		fullName: 'العربية',
		shortName: 'AR',
		dutchName: 'Arabisch',
		urlPrefix: '/ar',
		locale: 'ar',
		hreflang: 'ar',
		direction: 'rtl',
	},
	ukrainian: {
		id: Locales.Ukrainian,
		fullName: 'Українська',
		shortName: 'UA',
		dutchName: 'Oekraïens',
		urlPrefix: '/ua',
		locale: 'ua',
		hreflang: 'uk',
		direction: 'ltr',
	},
};

export const availableLocales = [
	locales.dutch,
	locales.english,
	locales.turkish,
	locales.polish,
	locales.arabic,
	locales.ukrainian,
];

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\/?/;
export const getLocaleFromURL = (pathname: string): Locale => {
	const langCodeMatch = pathname.match(langPathRegex);
	const langCode = langCodeMatch ? langCodeMatch[1] : 'nl';

	return (
		availableLocales.find((locale) => locale.id === langCode) ||
		availableLocales[0]
	);
};
