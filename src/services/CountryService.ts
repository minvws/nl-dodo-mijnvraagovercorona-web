import { countries, Country } from 'config/countries';

const MAX_SEARCH_RESULTS = 10;

export const searchCities = (query: string): Country[] => {
	const primaryMatches = countries.filter((country) =>
		country.fullName.toLowerCase().startsWith(query.toLowerCase()),
	);
	const secondaryMatches = countries.filter(
		(country) =>
			!primaryMatches.includes(country) &&
			country.fullName.toLowerCase().includes(query.toLowerCase()),
	);

	return [...primaryMatches, ...secondaryMatches].slice(0, MAX_SEARCH_RESULTS);
};
