import { renderHook } from '@testing-library/react-hooks';
import { getCurrentUrlForLanguage, useCurrentLangage } from './utils';
import { Language } from './language-selector';

const nl: Language = {
	id: 1,
	urlPrefix: '/nl',
	fullName: 'Nederlands',
	currentLanguageText: '',
};
const en: Language = {
	id: 2,
	urlPrefix: '/en',
	fullName: 'Engels',
	currentLanguageText: '',
};
const de: Language = {
	id: 3,
	urlPrefix: '/de',
	fullName: 'Duits',
	currentLanguageText: '',
};

describe('Language selector', () => {
	it('useCurrentLanguage Hook: Should get the right language from the current url', () => {
		// @ts-ignore
		const languages = [nl, en, de];

		// Url without a language param should default to NL (first in the array)
		expect(
			renderHook(() =>
				useCurrentLangage('/voorbereiding/op/quarantaine', languages),
			).result.current.fullName,
		).toEqual('Nederlands');

		// A known language prefix should result in that language.
		expect(
			renderHook(() =>
				useCurrentLangage('/en/voorbereiding/op/quarantaine', languages),
			).result.current.fullName,
		).toEqual('Engels');

		// A unknown language prefix is the same as no language prefix -> NL (first in the array)
		expect(
			renderHook(() =>
				useCurrentLangage('/be/voorbereiding/op/quarantaine', languages),
			).result.current.fullName,
		).toEqual('Nederlands');

		// Should default to NL if somehow no url is supplied.
		expect(
			renderHook(() => useCurrentLangage(undefined, languages)).result.current
				.fullName,
		).toEqual('Nederlands');
	});

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
