import { type Locale, availableLocales } from '@mvoc/ui/helpers';

export interface GlobalData {
	close: string;
	updatedAt: string;
	clearField: string;
	previous: string;
	next: string;
	goTo: string;
	openVideo: string;
	feedback: {
		title: string;
		content?: string;
		button: string;
		like: string;
		dislike: string;
		thanks: string;
	};
}

export type GlobalDataByLocale = {
	[K in (typeof availableLocales)[number]['id']]: GlobalData;
};

const defaults = {
	close: 'Sluiten',
	updatedAt: 'Laatst bijgewerkt:',
	clearField: 'Veld leegmaken',
	previous: 'Vorige',
	next: 'Volgende',
	goTo: 'Ga naar',
	openVideo: 'Open video',
	feedback: {
		title: 'Heeft deze informatie je voldoende geholpen?',
		content: 'We zijn benieuwd naar je mening.',
		button: 'Laat het ons weten',
		like: 'Ja',
		dislike: 'Nee',
		thanks:
			'Dank voor je reactie! Wil je anoniem delen hoe we verder kunnen verbeteren?',
	},
} as GlobalData;

let globalDataTranslated: GlobalDataByLocale;
export const setGlobalData = (data: GlobalDataByLocale) => {
	globalDataTranslated = data;
};

export function useGlobalData({ locale }: { locale: Locale }): GlobalData {
	return globalDataTranslated && globalDataTranslated[locale.id]
		? globalDataTranslated[locale.id]
		: defaults;
}
