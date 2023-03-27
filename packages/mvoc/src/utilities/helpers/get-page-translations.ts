import { availableLocales } from '../locale/translation';

export const getPageTranslations = (pages) =>
	pages.reduce((pagesAcc, parsePage) => {
		const parsePageID = parsePage.base_ref
			? parsePage.base_ref.split('__i18n')[0]
			: undefined || parsePage.id;

		const alternatives = pages.filter((page) => {
			const pageID = page.base_ref
				? page.base_ref.split('__i18n')[0]
				: undefined || page.id;

			return parsePageID === pageID;
		});

		const newPage = {
			...parsePage,
			alternatives: alternatives
				.filter(
					(page) =>
						availableLocales.filter((locale) => locale.id === page.localeID)
							.length,
				)
				.map((alternative) => ({
					locale: availableLocales.filter(
						(locale) => locale.id === alternative.localeID,
					)[0],
					slug: alternative.slug,
				})),
		};

		return [...pagesAcc, newPage];
	}, []);
