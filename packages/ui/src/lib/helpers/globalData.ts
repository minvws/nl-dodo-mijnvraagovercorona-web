import { type Locale, availableLocales } from '@mvoc/ui/helpers';

export interface GlobalData {
	close: string;
	updatedAt: string;
	clearField: string;
}

export type GlobalDataByLocale = {
	[K in (typeof availableLocales)[number]['id']]: GlobalData;
};

const defaults = {
	close: 'Sluiten',
	updatedAt: 'Laatst bijgewerkt:',
	clearField: 'Veld leegmaken',
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
