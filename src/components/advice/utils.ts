interface UrlWithDestinationProperties {
	destination: string;
}

interface ResultUrlProperties extends UrlWithDestinationProperties {
	fromDate: string;
	toDate: string;
	meansOfTransport: string;
	stage: string;
}

/**
 * Small helper method to generate paths for all advice steps.
 * This way we avoid repetation of paths, risking a typo somewhere.
 */
export const getAdvicePath = {
	destination: () => '/bestemming',
	period: ({ destination }: UrlWithDestinationProperties) =>
		`/${destination}/periode`,
	meansOfTransport: ({ destination }: UrlWithDestinationProperties) =>
		`/${destination}/vervoersmiddel`,
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
