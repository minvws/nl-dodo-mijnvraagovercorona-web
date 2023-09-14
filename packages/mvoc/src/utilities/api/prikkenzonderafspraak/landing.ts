import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import {
	PageProps,
	pageQuery,
	heroQuery,
	HeroProps,
	customBlockQuery,
	taleReferenceQuery,
	TaleCollectionProps,
	ButtonsProps,
	buttonsQuery,
	AssistanceProps,
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
}

export async function getDataPZALandingPages() {
	const projection = `{
		breadcrumbTitle,
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
