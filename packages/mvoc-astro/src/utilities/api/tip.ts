import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
	imageQuery,
} from './queries';

export interface TipPageProps extends PageProps {
	header: {
		title: string;
		content: Array<Object>;
		image: ImageProps;
		showTOC: boolean;
	};
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
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'tip-document',
		projection,
		locale,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
