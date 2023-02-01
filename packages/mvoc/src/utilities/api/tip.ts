import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
	imageQuery,
	tipsCollectionQuery,
	TipCollectionProps,
} from './queries';
import { AssistanceProps, assistanceQuery } from './queries/assistance';
import { storiesQuery, StoryProps } from './queries/stories';

interface MoreTipsProps extends TipCollectionProps {
	title: string;
}

export interface TipPageProps extends PageProps {
	header: {
		title: string;
		content: ContentBlockProps['value'];
		image: ImageProps;
		showTOC: boolean;
	};
	stories: StoryProps[];
	moreTips: MoreTipsProps;
	sources: {
		title: string;
		content: ContentBlockProps['value'];
	};
	assistance: AssistanceProps;
	slug: string;
	updatedAt: string;
}

export async function getDataTips({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
		"header": {
			${localePropertyQuery({ name: 'title', path: 'header.title', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${imageQuery({ name: 'image', path: 'header.image' })},
			"showTOC": header.showTOC
		},
		${storiesQuery({ locale })},
		"moreTips": {
			${localePropertyQuery({ name: 'title', path: 'moreTips.title', locale })},
			${tipsCollectionQuery({ path: 'moreTips', locale })},
		},
		"sources": {
			${localePropertyQuery({ name: 'title', path: 'sources.title', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'sources.content',
				locale,
				block: true,
			})},
		},
		${assistanceQuery({ locale })},
		"updatedAt": _updatedAt,
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'tip-document',
		projection,
		locale,
		slug,
		multiple: true,
		site: 'mijn-vraag-over-corona',
	});

	return await useSanityClient().fetch(query);
}
