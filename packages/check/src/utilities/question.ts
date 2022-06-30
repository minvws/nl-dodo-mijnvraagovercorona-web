import { getLocaleProperty } from '@quarantaine/common';

export interface QuestionCollectionProps {
	questionCollection: {
		title: Array<Object>;
		path: string;
	}[];
}

export const getQuestionCollection = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `"questionCollection": ${path ? `${path}.` : ''}questionCollection[]{
		${getLocaleProperty({ name: 'title', locale, block: true })},
		"path": select(
			situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
			situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
		),
	}`;
};
