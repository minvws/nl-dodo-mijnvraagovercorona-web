import Fuse from 'fuse.js';

import { countries, Country, SynonymSlugs } from 'config/countries';
import { Languages } from 'config/languages';

import {
	countriesNl as countriesNlTranslations,
	countriesEn as countriesEnTranslations,
	synonymsNL as synonymsNlTranslations,
	synonymsEN as synonymsEnTranslations,
} from 'content/countries';

const MAX_SEARCH_RESULTS = 6;

const fuseSettings = {
	includeScore: true,
	shouldSort: true,
	keys: ['slug', 'synonyms'],
	threshold: 0.2,
	distance: 100,
	includeMatches: true,
};

const fuseSearchInstanceNl = new Fuse(countries, {
	...fuseSettings,
	getFn: (country, path) => {
		if (path[0] === 'synonyms' && country.synonyms)
			return country.synonyms.map(
				(synonym: SynonymSlugs) => synonymsNlTranslations[synonym],
			);

		if (path[0] === 'slug') return countriesNlTranslations[country.slug];

		return [];
	},
});
const fuseSearchInstanceEn = new Fuse(countries, {
	...fuseSettings,
	getFn: (country, path) => {
		if (path[0] === 'synonyms' && country.synonyms)
			return country.synonyms.map(
				(synonym: SynonymSlugs) => synonymsEnTranslations[synonym],
			);
		if (path[0] === 'slug') return countriesEnTranslations[country.slug];

		return [];
	},
});

export interface CountryMatches extends Country {
	matchedOn?: string;
}

export const searchCities = (
	query: string,
	locale: Languages,
): CountryMatches[] => {
	const results =
		locale === 'nl'
			? fuseSearchInstanceNl.search(query)
			: fuseSearchInstanceEn.search(query);

	return results
		.map((result) => ({
			...result.item,
			matchedOn: result?.matches?.[0].value,
		}))
		.slice(0, MAX_SEARCH_RESULTS);
};
