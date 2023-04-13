import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { ImageProps, imageQuery } from './queries';
import {
	MoreInfoProps,
	PageProps,
	TaleCollectionProps,
	customBlockQuery,
	heroQuery,
	moreInfoQuery,
	pageQuery,
	taleReferenceQuery,
} from './queries/translated';
import {
	AssistanceProps,
	assistanceQuery,
} from './queries/translated/assistance';

export interface GenericPageProps extends PageProps {
	hero: {
		chapeau?: string;
		title;
		image: ImageProps;
		content?: ContentBlockProps['value'];
	};
	showTOC?: boolean;
	content: ContentBlockProps['value'];
	taleCollection: TaleCollectionProps['taleCollection'];
	moreInfo: MoreInfoProps;
	sources: {
		title: string;
		content: ContentBlockProps['value'];
	};
	assistance: AssistanceProps;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataGenericPages() {
	const projection = `{
		${heroQuery()},
		showTOC,
		${customBlockQuery({ name: 'content' })},
		${taleReferenceQuery()},
		${moreInfoQuery()},
		sources{
			title,
			${customBlockQuery({ name: 'content' })},
		},
		${assistanceQuery()},
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
