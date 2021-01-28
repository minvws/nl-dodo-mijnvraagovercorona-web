interface ResultUrlProperties {
	destination: string;
	fromDate: string;
	toDate: string;
	meansOfTransport: string;
	stage: string;
}

interface StepsUrlProperties {
	destination?: string;
	fromDate?: string;
	toDate?: string;
	meansOfTransport?: string;
	stage?: string;
}

/**
 * Small helper method to generate paths for all advice steps.
 * This way we avoid repetation of paths, risking a typo somewhere.
 */
export const getAdvicePath = {
	destination: () => '/bestemming',
	period: () => `/periode`,
	meansOfTransport: () => `/vervoersmiddel`,
	steps: ({
		destination,
		fromDate,
		toDate,
		meansOfTransport,
		stage,
	}: StepsUrlProperties) => {
		if (!destination) return '/bestemming';
		if (!fromDate || !toDate || !stage) return '/periode';
		if (!meansOfTransport) return '/vervoersmiddel';
	},
	result: ({
		destination,
		fromDate,
		toDate,
		meansOfTransport,
		stage,
	}: ResultUrlProperties) =>
		`/${destination}/${meansOfTransport}/${stage}?van=${fromDate}&tot=${toDate}`,
	noResult: () => '/geen-advies',
};
