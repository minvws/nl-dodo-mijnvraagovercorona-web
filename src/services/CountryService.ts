import { countries, Country } from 'config/countries';

const MAX_SEARCH_RESULTS = 10;

export const searchCities = (query: string): Country[] => {
	return countries
		.filter((country) =>
			country.fullName.toLowerCase().startsWith(query.toLowerCase()),
		)
		.slice(0, MAX_SEARCH_RESULTS + 1);
};
