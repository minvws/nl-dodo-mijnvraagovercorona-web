import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { Locale } from 'src/utilities/locale/translation';
import { ImageProps, imageQuery } from './image';
import { localePropertyQuery } from './localeProperty';
import { QuestionCollectionProps, questionCollectionQuery } from './question';

export interface ThemeProps extends QuestionCollectionProps {
	overview: {
		title: string;
		icon: ImageProps;
	};
	slug: string;
}

export interface ThemeCollectionProps {
	themeCollection: ThemeProps[];
}

export const themeCollectionQuery = ({
	path,
	locale,
}: {
	path?: string;
	locale: Locale;
}): string => {
	return `"themeCollection": ${path ? `${path}.` : ''}themeCollection[]->{
		"overview": {
			${localePropertyQuery({ name: 'title', path: 'overview.title', locale })},
			${imageQuery({ name: 'icon', path: 'overview.icon' })},
		},
		${questionCollectionQuery({ locale })},
		"slug": slug.current,
	}`;
};
