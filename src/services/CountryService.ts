import { countries, Country } from 'config/countries';
import Fuse from 'fuse.js';

const MAX_SEARCH_RESULTS = 6;

const fuseSearchInstance = new Fuse(countries, {
	includeScore: true,
	shouldSort: true,
	keys: ['fullName', 'synonyms'],
	threshold: 0.2,
	distance: 100,
	includeMatches: true,
});

export interface CountryMatches extends Country {
	matchedOn?: string;
}

export const searchCities = (query: string): CountryMatches[] => {
	const results = fuseSearchInstance.search(query);

	return results
		.map((result) => ({
			...result.item,
			matchedOn: result?.matches?.[0].value,
		}))
		.slice(0, MAX_SEARCH_RESULTS);
};
