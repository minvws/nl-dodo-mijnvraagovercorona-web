import { countries } from 'config/countries';

/**
 * Hook that finds the destination based on the url slug.
 * @param destination Intentionally uses "string" instead of CountrySlug type
 * since there could be an invalid slug in the url.
 */
export const useDestination = (destination: string) => {
	const matchingDestination = countries.find(
		(country) => country.slug === destination,
	);

	return matchingDestination ?? null;
};
