export interface Locale {
	id: string;
	title: string;
	isDefault?: boolean;
}

export const supportedLocales: Locale[] = [
	{ id: 'nl', title: 'Nederlands', isDefault: true },
	{ id: 'en', title: 'Engels' },
	{ id: 'es', title: 'Spaans' },
];

export const baseLocale: Locale | undefined = supportedLocales.find(
	(locale: Locale): boolean | undefined => locale.isDefault,
);
