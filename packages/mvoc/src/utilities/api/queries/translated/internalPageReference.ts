import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { customBlockQuery } from './customBlock';

export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: ContentBlockProps['value'];
		link: {
			label: string | null;
			slug: string;
		};
	}[];
}

export const internalPageReferenceInSelectQuery = (): string => {
	return `
		pageReference->_type == "theme-page" => 'thema/' + pageReference->slug.current,
		pageReference->_type == "tip-document" => 'tip/' + pageReference->slug.current,
		pageReference->_type == "generic-page" => pageReference->slug.current,
	`;
};

export const internalPageReferenceQuery = (): string => {
	return `internalPageCollection[]{
		${customBlockQuery({ name: 'label' })},
		"link": select(
			pageReference->_type == "theme-page" => pageReference->{
				"label": metaData.title,
				"slug": 'thema/' + slug.current
			},
			pageReference->_type == "generic-page" => pageReference->{
				"label": metaData.title,
				"slug": slug.current,
			},
		),
	}`;
};
