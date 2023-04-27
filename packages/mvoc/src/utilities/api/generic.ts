import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import {
	HeroProps,
	MoreInfoProps,
	PageProps,
	TaleCollectionProps,
	customBlockQuery,
	heroQuery,
	moreInfoQuery,
	pageQuery,
	taleReferenceQuery,
	AssistanceProps,
	assistanceQuery,
} from './queries';

export interface GenericPageProps extends PageProps {
	hero: HeroProps;
	showTOC?: boolean;
	content: ContentBlockProps['value'];
	taleCollection: TaleCollectionProps['taleCollection'];
	moreInfo: MoreInfoProps;
	sources: {
		title: string;
		content: ContentBlockProps['value'];
	};
	showFeedback?: boolean;
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
		showFeedback,
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
