export enum Languages {
	Dutch = 'nl',
	English = 'en',
}

export interface Language {
	id: Languages;
	fullName: string;
	shortName: string;
	urlPrefix: string;
}

/**
 * @note The default language (NL), should always be the first
 * in the array since the first language is used as the default if no
 * language can be resolved.
 */
export const languages: Language[] = [
	{
		id: Languages.Dutch,
		fullName: 'Nederlands',
		shortName: 'Nl',
		urlPrefix: '/nl',
	},
	{
		id: Languages.English,
		fullName: 'English',
		shortName: 'En',
		urlPrefix: '/en',
	},
];
