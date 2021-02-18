import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useTranslation } from './use-translation';
import { TranslationProvider, Translations } from './translation-context';
import { Languages } from 'config/languages';

const getWrapper = (translations: Translations) => {
	const translationProviderWrapper: React.FC = ({ children }) => (
		<TranslationProvider
			content={translations}
			locale={Languages.English}
			siteSettings={{
				pageTitleSuffix: '',
				feedback: {
					button: '',
					content: '',
					title: '',
					url: '',
				},
				footer: {
					alleenSamenAlt: '',
					items: [''],
					meerInformatieTitle: '',
					rijksoverheidText: '',
					rijksoverheidUrl: '',
					title: '',
				},
				header: {
					logoAlt: 'string',
					opnieuw: 'string',
					terug: 'string',
					resultaat: 'string',
				},
				privacy: { title: '', beloftes: [''] },
				vervoersmiddelen: [
					{
						naam: 'vliegtuig',
						uitgebreid: '',
					},
				],
			}}
		>
			{children}
		</TranslationProvider>
	);

	return translationProviderWrapper;
};

describe('useTranslation Hook', () => {
	it('t() method should get the text for a specific translation key.', () => {
		const translations = {
			simpleText: 'A value',
			textWithStrong: 'Very <strong>strong</strong> text',
			interpolation__key: 'A string with a variable that is {{ whatIsIt }}',
		};

		const { result } = renderHook(() => useTranslation(), {
			wrapper: getWrapper(translations),
		});

		expect(result.current.t('simpleText')).toEqual('A value');
		// Convert string into a React component.
		expect(result.current.t('textWithStrong')).toMatchInlineSnapshot(`
		Array [
		  "Very ",
		  <strong>
		    strong
		  </strong>,
		  " text",
		]
	`);

		expect(
			result.current.t('interpolation__key', { whatIsIt: 'interpolated' }),
		).toEqual('A string with a variable that is interpolated');
	});

	it('t_s() method should get the text for a translation key and turn this into a string.', () => {
		const translations = {
			simpleText: 'A value',
			textWithStrong: 'Very <strong>strong</strong> text',
			interpolation__key: 'A string with a variable that is {{ whatIsIt }}',
		};

		const { result } = renderHook(() => useTranslation(), {
			wrapper: getWrapper(translations),
		});

		expect(result.current.t_s('simpleText')).toEqual('A value');
		// If the string method is used, any HTML in there will remain in the string
		// and will not be replaced.
		expect(result.current.t_s('textWithStrong')).toMatchInlineSnapshot(
			`"Very <strong>strong</strong> text"`,
		);

		expect(
			result.current.t_s('interpolation__key', { whatIsIt: 'interpolated' }),
		).toEqual('A string with a variable that is interpolated');
	});

	it('Should throw if a translation key is used that is not provided.', () => {
		const translations = {
			simpleText: 'A value',
		};

		const { result } = renderHook(() => useTranslation(), {
			wrapper: getWrapper(translations),
		});

		expect(() =>
			result.current.t('not_provided'),
		).toThrowErrorMatchingInlineSnapshot(
			`"Content with key \\"not_provided\\" not found.\\""`,
		);

		expect(() =>
			result.current.t_s('not_provided'),
		).toThrowErrorMatchingInlineSnapshot(
			`"Content with key \\"not_provided\\" not found.\\""`,
		);
	});

	it('Should throw if useTranslations() is used but component / page is not wrapped with a  TranslationProvider.', () => {
		const { result } = renderHook(() => useTranslation());

		expect(() =>
			result.current.t('anystring'),
		).toThrowErrorMatchingInlineSnapshot(
			`"Using useTranslation hook while no content is supplied."`,
		);

		expect(() =>
			result.current.t_s('anystring'),
		).toThrowErrorMatchingInlineSnapshot(
			`"Using useTranslation hook while no content is supplied."`,
		);
	});
});
