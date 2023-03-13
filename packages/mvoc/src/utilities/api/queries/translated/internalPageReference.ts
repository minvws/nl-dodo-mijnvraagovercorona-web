import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { customBlockQuery } from './customBlock';

export const references = [
	{
		type: 'theme-page',
		label: 'metaData.title',
		slug: `slug.current`,
	},
	{
		type: 'generic-page',
		label: 'metaData.title',
		slug: `slug.current`,
	},
	{
		type: 'locations-page',
		label: 'metaData.title',
		slug: `pageReference->theme->slug.current + '/prikkenzonderafspraak/' + pageReference->slug.current`,
	},
];

export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: ContentBlockProps['value'];
		link: {
			label: string | null | { nl: string; en: string };
			slug: string;
		};
	}[];
}

export const internalPageReferenceInSelectQuery = (): string => {
	return `
		pageReference->_type == "theme-page" => pageReference->slug.current,
		pageReference->_type == "generic-page" => pageReference->slug.current,
		pageReference->_type == "locations-page" => pageReference->theme->slug.current + '/prikkenzonderafspraak/' + pageReference->slug.current,
		pageReference->_type == "tip-document" => 'tip/' + pageReference->slug.current,
	`;
};

export const internalPageReferenceQuery = (): string => {
	return `internalPageCollection[]{
		${customBlockQuery({ name: 'label' })},
		"link": select(
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
				"slug": pageReference->theme->slug.current + '/prikkenzonderafspraak/' + pageReference->slug.current,
			},
			pageReference->_type == "tip-document" => pageReference->{
				"label": metaData.title,
				"slug": 'tip/' + slug.current
			},
		),
	}`;
};
