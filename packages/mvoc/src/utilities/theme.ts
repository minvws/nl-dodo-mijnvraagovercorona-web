import {
	getImage,
	getLocaleProperty,
	SanityImageFullProps,
} from '@quarantaine/common';
import { getQuestionCollection, QuestionCollectionProps } from './question';

export interface ThemeProps extends QuestionCollectionProps {
	title: string;
	icon: SanityImageFullProps;
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
		${getImage({ name: 'icon', full: true })},
		${getQuestionCollection({ locale })},
		"slug": slug.current,
	}`;
};
