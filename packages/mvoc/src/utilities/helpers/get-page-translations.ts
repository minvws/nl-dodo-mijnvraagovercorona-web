import { availableLocales } from '../locale/translation';

export const getPageTranslations = (data, multiple = true) => {
	const parsePage = (oldPage) => {
		const parsePageID = oldPage.base_ref
			? oldPage.base_ref.split('__i18n')[0]
			: undefined || oldPage.id;

		const alternatives = data.filter((page) => {
			const pageID = page.base_ref
				? page.base_ref.split('__i18n')[0]
				: undefined || page.id;

			return parsePageID === pageID;
		});

		return {
			...oldPage,
			alternatives: alternatives.map((alternative) => ({
				locale: availableLocales.filter(
					(locale) => locale.id === alternative.localeID,
				)[0],
				slug: alternative.slug,
			})),
		};
	};
	return multiple
		? data.reduce((pagesAcc, oldPage) => {
				const newPage = parsePage(oldPage);
				return [...pagesAcc, newPage];
		  }, [])
		: parsePage(data);
};
