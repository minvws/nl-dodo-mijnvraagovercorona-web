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

export interface ThemePageProps extends PageProps {
	header: {
		title: string;
		content: ContentBlockProps['value'];
		image: ImageProps;
	};
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
			${localePropertyQuery({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${imageQuery({ name: 'image', path: 'header.image' })},
		},
		"updatedAt": _updatedAt,
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'theme-document',
		projection,
		locale,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
