import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import { customBlockQuery } from './queries';
import { PageProps } from './queries/translated';

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

	// TODO update page query
	const query = pageQuery({
		type: 'generic-page',
		projection,
		locale,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
