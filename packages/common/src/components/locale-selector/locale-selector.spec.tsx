import { getCurrentUrlForLocale } from './utils';

import { Locale, Locales } from '@quarantaine/common';

const nl: Locale = {
	id: Locales.Dutch,
	urlPrefix: '/nl',
	fullName: 'Nederlands',
	shortName: 'NL',
	locale: 'nl_NL',
	alternateLocales: ['en_GB'],
};
const en: Locale = {
	id: Locales.English,
	urlPrefix: '/en',
	fullName: 'Engels',
	shortName: 'EN',
	locale: 'en_GB',
	alternateLocales: ['nl_NL'],
};

describe('Language selector', () => {
	it('getCurrentUrlForLanguage util: Should transform a url from 1 language to another', () => {
		// NL to EN
		expect(
			getCurrentUrlForLanguage('/nl/voorbereiding/op/quarantaine', en, nl),
		).toEqual('/en/voorbereiding/op/quarantaine');

		// NL to EN, homepage
		expect(getCurrentUrlForLanguage('/nl', en, nl)).toEqual('/en');

		// NL to NL
		expect(
			getCurrentUrlForLanguage('/voorbereiding/op/quarantaine', nl, nl),
		).toEqual('/voorbereiding/op/quarantaine');

		// Without language param to NL, homepage
		expect(getCurrentUrlForLanguage('/', nl, nl)).toEqual('/nl');

		// Without language param to EN, homepage
		expect(getCurrentUrlForLanguage('/', en, nl)).toEqual('/en');

		// EN to NL, homepage
		expect(getCurrentUrlForLanguage('/en', nl, en)).toEqual('/nl');

		// EN to NL
		expect(getCurrentUrlForLanguage('/en/quarantaine/tips', nl, en)).toEqual(
			'/nl/quarantaine/tips',
		);

		// Keep query params, EN to NL
		expect(
			getCurrentUrlForLanguage('/en/quarantaine/tips?withquery=here', nl, en),
		).toEqual('/nl/quarantaine/tips?withquery=here');

		// Keep query params, homepage
		expect(getCurrentUrlForLanguage('/nl/?withquery=here', en, nl)).toEqual(
			'/en/?withquery=here',
		);
	});
});
