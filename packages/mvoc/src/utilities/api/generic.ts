import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';

export interface GenericPageProps extends PageProps {
	title: string;
	content: ContentBlockProps['value'];
}

export async function getDataGenericPages({ slug }: { slug?: string }) {
	const projection = `{
		header{
			chapeau,
			title,
			${customBlockQuery({ name: 'content' })},
		},
		${customBlockQuery({ name: 'content' })},
	}`;

	const query = pageQuery({
		type: 'generic-page',
		projection,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
