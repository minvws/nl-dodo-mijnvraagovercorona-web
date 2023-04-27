import { subFolderReferenceQuery } from '.';

export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: string;
		link: {
			label: string | null | { nl: string; en: string };
			slug: string;
		};
	}[];
}

export const internalPageReferenceInSelectQuery = (): string => {
	return `
		pageReference->_type match "-page" =>
		pageReference->{
			"slug": slug.current,
			${subFolderReferenceQuery()}
		}
	`;
};

export const internalPageReferenceQuery = (): string => {
	return `internalPageCollection[]{
		label,
		"link": select(
			defined(href) => {"slug": href},
			pageReference->_type match "-page" => pageReference->{
				"label": metaData.title,
				"slug": slug.current
			},
		),
	}`;
};
