import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
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
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface GenericPageProps extends PageProps {
	hero: HeroProps;
	content: ContentBlockProps['value'];
	talesAsDisclosure?: boolean;
	taleCollection: TaleCollectionProps['taleCollection'];
	moreInfo: MoreInfoProps;
	sources: {
		title: string;
		content: ContentBlockProps['value'];
	};
	showFeedback?: boolean;
	assistance: AssistanceProps;
	locale: string;
	slug: string;
}

export async function getDataGenericPages() {
	const projection = `{
		${heroQuery()},
		${customBlockQuery({ name: 'content' })},
		talesAsDisclosure,
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

	return getAdditionalPageData(data.pages);
}
