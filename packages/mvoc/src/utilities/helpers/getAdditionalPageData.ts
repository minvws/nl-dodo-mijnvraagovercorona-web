import { SubFolderReferenceProps } from '../api/queries';
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

export interface AlternativeTranslationsProps extends SubFolderReferenceProps {
	locale: Locale;
	href: string;
}

const getDataForAlternatives = (pages) =>
	pages.map((page) => ({
		...page,
		alternatives: page.alternatives
			.filter((alternative) => alternative)
			.map((alternative) => ({
				...alternative,
				href: `${
					alternative.subFolderReference
						? `${getPageSubfolder(alternative)}/`
						: ''
				}${alternative.theme ? `${alternative.theme.slug}/` : ''}${
					alternative.slug || ''
				}`,
				locale: availableLocales.filter(
					(locale) => locale.id === alternative.locale,
				)[0],
			})),
	}));

export const getAdditionalPageData = (pages) =>
	getPageBreadcrumbs(getDataForAlternatives(pages));
