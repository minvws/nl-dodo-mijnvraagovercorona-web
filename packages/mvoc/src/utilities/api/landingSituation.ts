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
import { storiesQuery, StoryProps } from './queries/stories';
import {
	getEssentialQuestionPageProjection,
	QuestionPageProps,
} from './situationQuestions';

export interface LandingSituationPageProps extends PageProps {
	header: {
		title: string;
		chapeau: string;
		content: ContentBlockProps['value'];
		image: ImageProps;
	};
	titleCustom: string;
	stories: StoryProps[];
	question: QuestionPageProps;
	slug: string;
	updatedAt: string;
}

export async function getDataLandingSituations({
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
		${localePropertyQuery({ name: 'titleCustom', path: 'titleCustom', locale })},
		${storiesQuery({ locale })},
		"question": situationReference->{
			${getEssentialQuestionPageProjection({ locale: locale })}
		},
		"updatedAt": _updatedAt,
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'landing-situations-document',
		projection,
		locale,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
