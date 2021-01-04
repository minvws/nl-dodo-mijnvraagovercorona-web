import { countries } from 'config/countries';

const SEGMENT_SEPARATOR = '~';

export function formatPeriod(fromDate: Date, toDate: Date): string {
	const fromStr = fromDate.toISOString().substr(0, 10);
	const toStr = toDate.toISOString().substr(0, 10);

	return `${fromStr}${SEGMENT_SEPARATOR}${toStr}`;
}

export function parsePeriod(periodStr: string): [Date, Date] {
	if (periodStr.indexOf(SEGMENT_SEPARATOR) < 0 || periodStr.length < 21) {
		throw new Error('Date range is invalid');
	}

	const [fromDateStr, toDateStr] = periodStr.split(SEGMENT_SEPARATOR);
	const dateStrToDate = (input: string) => new Date(Date.parse(input));

	return [dateStrToDate(fromDateStr), dateStrToDate(toDateStr)];
}

export function getCountrySlug(countryName: string) {
	const matchedCountry = countries.find(
		(country) => country.fullName === countryName,
	);
	return matchedCountry?.slug ?? null;
}
