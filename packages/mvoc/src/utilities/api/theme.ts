import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
	imageQuery,
} from './queries';
import { AssistanceProps, assistanceQuery } from './queries/assistance';
import {
	QuestionCollectionProps,
	questionCollectionQuery,
} from './queries/question';
import { storiesQuery, StoryProps } from './queries/stories';

export interface ThemePageProps extends PageProps, QuestionCollectionProps {
	header: {
		title: string;
		chapeau: string;
		content: ContentBlockProps['value'];
		image: ImageProps;
	};
	titleFlow: string;
	stories: StoryProps[];
	assistance: AssistanceProps;
	slug: string;
	updatedAt: string;
}

export async function getDataThemes({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
		"header": {
			${localePropertyQuery({ name: 'title', path: 'header.title', locale })},
			${localePropertyQuery({ name: 'chapeau', path: 'header.chapeau', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${imageQuery({ name: 'image', path: 'header.image' })},
		},
		${localePropertyQuery({
			name: 'titleFlow',
			locale,
		})},
		${questionCollectionQuery({ locale })},
		${storiesQuery({ locale })},
		${assistanceQuery({ locale })},
		"updatedAt": _updatedAt,
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'theme-document',
		projection,
		locale,
		slug,
		multiple: true,
		site: 'mijn-vraag-over-corona',
	});

	return await useSanityClient().fetch(query);
}
