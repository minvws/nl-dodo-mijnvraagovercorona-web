export enum Locales {
	Dutch = 'nl',
	English = 'en',
}

export interface Locale {
	id: Locales;
	fullName: string;
	shortName: string;
	urlPrefix: string;
	locale: string;
	alternateLocales: string[];
}

export const locales: { [key: string]: Locale } = {
	dutch: {
		id: Locales.Dutch,
		fullName: 'Nederlands',
		shortName: 'Nl',
		urlPrefix: '/nl',
		locale: 'nl_nl',
		alternateLocales: ['en_gb'],
	},
	english: {
		id: Locales.English,
		fullName: 'English',
		shortName: 'En',
		urlPrefix: '/en',
		locale: 'en_gb',
		alternateLocales: ['nl_nl'],
	},
};
