interface ResultUrlProperties {
	destination: string;
	fromDate?: string;
	toDate?: string;
	meansOfTransport: string;
	stage: string;
	locale: 'nl' | 'en';
}

interface StepsUrlProperties {
	destination?: string;
	fromDate?: string;
	toDate?: string;
	meansOfTransport?: string;
	stage?: string;
	locale: 'nl' | 'en';
}

interface NoResultUrlProperties {
	destination: string;
	locale: 'nl' | 'en';
}

/**
 * Small helper method to generate paths for all advice steps.
 * This way we avoid repetation of paths, risking a typo somewhere.
 */
export const getAdvicePath = {
	destination: (locale: 'nl' | 'en') => `/${locale}/bestemming`,
	period: (locale: 'nl' | 'en') => `/${locale}/periode`,
	meansOfTransport: (locale: 'nl' | 'en') => `/${locale}/vervoersmiddel`,
	steps: ({
		destination,
		fromDate,
		toDate,
		meansOfTransport,
		stage,
		locale,
	}: StepsUrlProperties) => {
		if (!destination) return `/${locale}/bestemming`;
		if (!fromDate || !toDate || !stage) return `/${locale}/periode`;
		if (!meansOfTransport) return `/${locale}/vervoersmiddel`;
	},
	result: ({
		destination,
		fromDate,
		toDate,
		meansOfTransport,
		stage,
		locale,
	}: ResultUrlProperties): {
		pathname: string;
		query: { van?: string; tot?: string };
	} => ({
		pathname: `/${locale}/${destination}/${meansOfTransport}/${stage}`,
		query: { van: fromDate, tot: toDate },
	}),
	noResult: ({ destination, locale }: NoResultUrlProperties) =>
		`/${locale}/${destination}/geen-advies`,
};
