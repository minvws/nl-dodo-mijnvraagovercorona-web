import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';

export interface GenericPageProps extends PageProps {
	header: {
		chapeau?: string;
		title;
		content: ContentBlockProps['value'];
	};
	content: ContentBlockProps['value'];
	locale: string;
	alternatives: string[];
	slug: string;
}

export async function getDataGenericPages({ slug }: { slug?: string }) {
	const projection = `{
		header{
			chapeau,
			title,
			${customBlockQuery({ name: 'content' })},
		},
		${customBlockQuery({ name: 'content' })},
		"locale": __i18n_lang,
		"alternatives": [__i18n_lang, ...__i18n_refs[].lang],
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'generic-page',
		projection,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
