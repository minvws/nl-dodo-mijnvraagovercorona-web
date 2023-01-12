import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';

export interface GenericPageProps extends PageProps {
	title: string;
	content: ContentBlockProps['value'];
}

export async function getDataGenericPages({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
		header{
			chapeau,
			title,
			${customBlockQuery({ name: 'content', locale })},
		},
		${customBlockQuery({ name: 'content', locale })},
	}`;

	const query = pageQuery({
		type: 'generic-page',
		projection,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
