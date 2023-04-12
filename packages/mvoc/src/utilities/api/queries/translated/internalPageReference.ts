import { subFolderReferenceQuery } from './subFolderReference';

export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: string;
		link: {
			label: string | null | { nl: string; en: string };
			slug: string;
		};
	}[];
}

const internalPageReferenceFolderReferenceQuery = ({
	slugPrefix,
	referencePrefix,
}: {
	slugPrefix?: string;
	referencePrefix?: string;
}): string => {
	return `
		pageReference->{
			"slug": ${slugPrefix ? `'${slugPrefix}' + '/' + ` : ''}${
		referencePrefix ? `${referencePrefix} + '/' + ` : ''
	}slug.current,
			${subFolderReferenceQuery()}
		}
	`;
};

export const internalPageReferenceInSelectQuery = (): string => {
	return `
		pageReference->_type == "theme-page" => ${internalPageReferenceFolderReferenceQuery(
			{},
		)},
		pageReference->_type == "generic-page" => ${internalPageReferenceFolderReferenceQuery(
			{},
		)},
		pageReference->_type == "locations-page" => ${internalPageReferenceFolderReferenceQuery(
			{
				referencePrefix: 'theme->slug.current',
			},
		)},
		pageReference->_type == "advice-page" => ${internalPageReferenceFolderReferenceQuery(
			{},
		)},
		pageReference->_type == "tip-document" => ${internalPageReferenceFolderReferenceQuery(
			{
				slugPrefix: 'tip',
			},
		)},
	`;
};

export const internalPageReferenceQuery = (): string => {
	return `internalPageCollection[]{
		label,
		"link": select(
			defined(href) => {"slug": href},
			pageReference->_type == "theme-page" => pageReference->{
				"label": metaData.title,
				"slug": slug.current
			},
			pageReference->_type == "generic-page" => pageReference->{
				"label": metaData.title,
				"slug": slug.current,
			},
			pageReference->_type == "locations-page" => pageReference->{
				"label": metaData.title,
				"slug": pageReference->theme->slug.current + '/' + pageReference->slug.current,
			},
			pageReference->_type == "tip-document" => pageReference->{
				"label": metaData.title,
				"slug": 'tip/' + slug.current
			},
		),
	}`;
};
