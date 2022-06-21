import { getLocaleProperty } from '@quarantaine/common';

export interface QuestionProps {
	header: {
		title: string;
	};
	slug: string;
}
export interface QuestionCollectionProps {
	questionCollection: {
		title: Array<Object>;
		question: QuestionProps;
	}[];
}

const getQuestion = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `
		"header": {
			${getLocaleProperty({
				name: 'title',
				path: `${path}header.title`,
				locale,
			})},
		},
		"slug": ${path}slug.current,
	`;
};

export const getQuestionCollection = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `"questionCollection": ${path ? `${path}.` : ''}questionCollection[]{
		${getLocaleProperty({ name: 'title', locale, block: true })},
		"question": {
			${getQuestion({ locale, path: 'questionReference->' })}
		},
	}`;
};
