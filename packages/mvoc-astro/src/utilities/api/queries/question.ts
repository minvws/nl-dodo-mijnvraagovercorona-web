import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { Locale } from 'src/utilities/locale/translation';
import { localePropertyQuery } from './localeProperty';

export interface QuestionCollectionProps {
	questionCollection: {
		title: ContentBlockProps['value'];
		path: string;
	}[];
}

export const questionCollectionQuery = ({
	path,
	locale,
}: {
	path?: string;
	locale: Locale;
}): string => {
	return `"questionCollection": ${path ? `${path}.` : ''}questionCollection[]{
		${localePropertyQuery({ name: 'title', locale, block: true })},
		"path": select(
			situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
			situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
			situationReference->_type == "tip-document" => 'tip/' + situationReference->slug.current,
		),
	}`;
};
