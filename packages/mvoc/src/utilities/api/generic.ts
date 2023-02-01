import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';

export interface GenericPageProps extends PageProps {
	header: {
		chapeau?: string;
		title;
		content: ContentBlockProps['value'];
	};
	content: ContentBlockProps['value'];
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataGenericPages() {
	const projection = `{
		header{
			chapeau,
			title,
			${customBlockQuery({ name: 'content' })},
		},
		${customBlockQuery({ name: 'content' })},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'generic-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
