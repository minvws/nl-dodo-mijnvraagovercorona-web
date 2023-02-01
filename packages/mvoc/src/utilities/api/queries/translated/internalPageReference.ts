import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { Locale } from 'src/utilities/locale/translation';
import { customBlockQuery } from './customBlock';
import { localePropertyQuery } from '../localeProperty';

export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: ContentBlockProps['value'];
		link: {
			label: string | null;
			slug: string;
		};
	}[];
}

export const internalPageReferenceQuery = ({
	locale,
}: {
	locale: Locale;
}): string => {
	return `internalPageCollection[]{
		${customBlockQuery({ name: 'label' })},
		"link": select(
			pageReference->_type == "theme-document" => pageReference->{
				${localePropertyQuery({ name: 'label', path: 'overview.title', locale })},
				"slug": 'thema/' + slug.current
			},
			pageReference->_type == "situation-question-document" => pageReference->{
				${localePropertyQuery({ name: 'label', path: 'header.title', locale })},
				"slug": 'situatie/' + slug.current,
			},
			pageReference->_type == "situation-result-document" => pageReference->{
				${localePropertyQuery({ name: 'label', path: 'header.title', locale })},
				"slug": 'advies/' + slug.current,
			},
			pageReference->_type == "tip-document" => pageReference->{
				${localePropertyQuery({ name: 'label', path: 'header.title', locale })},
				"slug": 'tip/' + slug.current,
			},
			pageReference->_type == "generic-page" => pageReference->{
				"label": header.title,
				"slug": slug.current,
			},
		),
	}`;
};
