import { ContentBlockProps } from '@modules/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	imageQuery,
	localePropertyQuery,
	ImageProps,
} from './queries';
import { AssistanceProps, assistanceQuery } from './queries/assistance';
import {
	QuestionCollectionProps,
	questionCollectionQuery,
} from './queries/question';
import { ThemeCollectionProps, themeCollectionQuery } from './queries/theme';

interface ImportantProps extends QuestionCollectionProps {
	title: string;
	content: ContentBlockProps['value'];
	icon: ImageProps;
}

interface ThemesProps extends ThemeCollectionProps {
	title: string;
	content: ContentBlockProps['value'];
}

export interface PageHomeProps extends PageProps {
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		image: ImageProps;
	};
	important: ImportantProps;
	themes: ThemesProps;
	assistance: AssistanceProps;
}

export async function getDataHome({ locale }: { locale: Locale }) {
	const projection = `{
		"header": {
			${localePropertyQuery({ name: 'title', path: 'header.title', locale })},
			${localePropertyQuery({ name: 'chapeau', path: 'header.chapeau', locale })},
			${localePropertyQuery({ name: 'subtitle', path: 'header.subtitle', locale })},
			${imageQuery({ name: 'image', path: 'header.image' })},
		},
		"important": {
			${localePropertyQuery({ name: 'title', path: 'important.title', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'important.content',
				locale,
				block: true,
			})},
			${imageQuery({ name: 'icon', path: 'important.icon' })},
			${questionCollectionQuery({ path: 'important', locale })},
		},
		"themes": {
			${localePropertyQuery({ name: 'title', path: 'themes.title', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'themes.content',
				locale,
				block: true,
			})},
			${themeCollectionQuery({ path: 'themes', locale })},
		},
		${assistanceQuery({ locale })},
	}`;

	const query = pageQuery({
		type: 'check-landing-page',
		projection,
		locale,
	});

	return await useSanityClient().fetch(query);
}
