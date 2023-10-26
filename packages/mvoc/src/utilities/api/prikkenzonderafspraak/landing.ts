import type { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type {
	PageProps,
	HeroProps,
	TaleCollectionProps,
	ButtonsProps,
	AssistanceProps,
} from '../queries';
import {
	pageQuery,
	heroQuery,
	customBlockQuery,
	taleReferenceQuery,
	buttonsQuery,
	assistanceQuery,
} from '../queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';

export interface PZALandingPageProps extends PageProps {
	hero: HeroProps;
	breadcrumbTitle: string;
	buttons: ButtonsProps;
	assistance: AssistanceProps;
	contentSecondary: ContentBlockProps['value'];
	taleCollection: TaleCollectionProps['taleCollection'];
	locale: string;
	slug: string;
	showFeedback?: boolean;
}

export async function getDataPZALandingPages() {
	const projection = `{
		breadcrumbTitle,
		showFeedback,
		${heroQuery()},
		${buttonsQuery({ array: true })},
		${customBlockQuery({ name: 'contentSecondary' })},
		${taleReferenceQuery()},
		${assistanceQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'pza-landing-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
