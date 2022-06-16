import { getLocaleProperty } from '@quarantaine/common';
import { getQuestionCollection, QuestionCollectionProps } from './question';

export interface ThemeProps extends QuestionCollectionProps {
	title: string;
	slug: string;
}

export interface ThemeCollectionProps {
	themeCollection: ThemeProps[];
}

export const getThemeCollection = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `"themeCollection": ${path ? `${path}.` : ''}themeCollection[]->{
		${getLocaleProperty({ name: 'title', locale })},
		"slug": slug.current,
		${getQuestionCollection({ locale })},
	}`;
};
