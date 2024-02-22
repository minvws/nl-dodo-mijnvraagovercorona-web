import { type Locale, availableLocales } from '@dodo/ui/helpers';

export interface GlobalData {
	logoAlt: string;
	close: string;
	updatedAt: string;
	clearField: string;
	previous: string;
	next: string;
	goTo: string;
	openVideo: string;
	mainNavigation: {
		landmark?: string;
		homeLabel?: string;
	};
	localeSelector: {
		title: string;
		change: string;
		current: string;
	};
	feedback: {
		title: string;
		titleMobile?: string;
		content?: string;
		button: string;
		href: string;
		like: string;
		dislike: string;
		thanks: string;
	};
}

export type GlobalDataByLocale = {
	[K in (typeof availableLocales)[number]['id']]: GlobalData;
};

const defaults = {
	logoAlt: 'Logo van de Rijksoverheid - terug naar homepage',
	close: 'Sluiten',
	updatedAt: 'Laatst bijgewerkt:',
	clearField: 'Veld leegmaken',
	previous: 'Vorige',
	next: 'Volgende',
	goTo: 'Ga naar',
	openVideo: 'Open video',
	mainNavigation: {
		landmark: 'Hoofdnavigatie',
		homeLabel: 'Home',
	},
	localeSelector: {
		title: 'Deze pagina in andere talen:',
		change: 'Wissel van taal',
		current: 'Huidige taal',
	},
	feedback: {
		title: 'Heeft deze informatie je voldoende geholpen?',
		titleMobile: 'Wat vind je van deze website?',
		content: 'We zijn benieuwd naar je mening.',
		button: 'Laat het ons weten',
		href: '#',
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
