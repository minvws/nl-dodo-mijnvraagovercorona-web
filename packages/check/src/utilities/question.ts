import { getLocaleProperty } from '@quarantaine/common';

export interface QuestionProps {
	header: {
		title: string;
	};
	slug: string;
}
export interface QuestionCollectionProps {
	questionCollection: QuestionProps[];
}

const getQuestion = ({ locale }: { locale: string }): string => {
	return `
		"header": {
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		"slug": slug.current,
	`;
};

export const getQuestionCollection = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `"questionCollection": ${path ? `${path}.` : ''}questionSelector[]->{
		${getQuestion({ locale })}
	}`;
};
