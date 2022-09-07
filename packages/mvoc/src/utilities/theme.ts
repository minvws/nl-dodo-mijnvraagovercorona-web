import {
	getClient,
	getImage,
	getLocaleProperty,
	Locales,
	SanityImageFullProps,
	siteSettingsQuery,
} from '@quarantaine/common';
import { getQuestionCollection, QuestionCollectionProps } from './question';

export interface ThemeProps extends QuestionCollectionProps {
	overview: {
		title: string;
		icon: SanityImageFullProps;
	};
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
		"overview": {
			${getLocaleProperty({ name: 'title', path: 'overview.title', locale })},
			${getImage({ name: 'icon', path: 'overview.icon', full: true })},
		},
		${getQuestionCollection({ locale })},
		"slug": slug.current,
	}`;
};

export const getThemes = async () => {
	const questions = await getClient(false).fetch(
		`*[_type=="theme-document"]{"theme": slug.current}`,
	);

	return questions;
};

export const getThemePageQuery = ({
	pageProjection,
	locale,
	theme,
}: {
	pageProjection: string;
	locale: Locales;
	theme: string;
}): string => `{
	"page": *[_type == "theme-document" && slug.current=="${theme}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({
		locale,
		site: 'mijn-vraag-over-corona',
	})},
}`;
