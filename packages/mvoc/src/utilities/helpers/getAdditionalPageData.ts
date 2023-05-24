import { availableLocales } from '../locale/translation';
import { getPageSubfolder } from './page-subfolder';
import { Locale } from 'src/utilities/locale/translation';

export type BreadcrumbProps = {
	slug: string;
	title: string;
};

const getPageBreadcrumbs = (pages) => {
	return pages.map((page) => {
		const breadcrumbs = [
			{
				slug: page.slug,
				title: page?.overview?.title || page.metaData.title,
			},
		];

		// iterate over subFolderReferences without recursion
		if (page.subFolderReference) {
			const stack = [page.subFolderReference];
			while (stack?.length > 0) {
				const currentObj = stack.pop();
				breadcrumbs.unshift({
					slug: currentObj.slug,
					title: currentObj.title,
				});
				Object.keys(currentObj).forEach((key) => {
					if (
						key === 'subFolderReference' &&
						typeof currentObj[key] === 'object' &&
						currentObj[key] !== null
					) {
						stack.push(currentObj[key]);
					}
				});
			}
		}
		return { ...page, breadcrumbs };
	});
};

export interface AlternativeTranslationsProps {
	locale: Locale;
	href: string;
}

const getPageTranslations = (pages) =>
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
					href: `${
						alternative.subFolderReference
							? `${getPageSubfolder(alternative)}/`
							: ''
					}${alternative.theme ? `${alternative.theme.slug}/` : ''}${
						alternative.slug || ''
					}`,
				})),
		};

		return [...pagesAcc, newPage];
	}, []);

export const getAdditionalPageData = (pages) =>
	getPageBreadcrumbs(getPageTranslations(pages));
