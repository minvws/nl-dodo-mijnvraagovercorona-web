import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { customBlockQuery } from './customBlock';

export interface InterimQuestionCollectionProps {
	questionCollection: {
		label: ContentBlockProps['value'];
		path: string;
	}[];
}

export const interimQuestionCollectionQuery = (): string => {
	return `questionCollection[]{
		${customBlockQuery({ name: 'label' })},
		"path": select(
			situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
			situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
			situationReference->_type == "tip-document" => 'tip/' + situationReference->slug.current,
		),
	}`;
};
