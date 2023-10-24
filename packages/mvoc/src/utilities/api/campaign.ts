import { useSanityClient } from 'astro-sanity';
import type {
	PageProps,
	HeroProps,
	AssistanceProps,
	CardsProps,
	TaleCollectionProps,
	TabsProps,
	CarouselProps,
} from './queries';
import {
	pageQuery,
	heroQuery,
	assistanceQuery,
	supportBlockQuery,
	taleReferenceQuery,
	tabsQuery,
	carouselQuery,
} from './queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';

export interface CampaignPageProps extends PageProps {
	hero: HeroProps;
	breadcrumbTitle: string;
	showFeedback?: boolean;
	assistance: AssistanceProps;
	taleCollection: TaleCollectionProps['taleCollection'];
	support: {
		cards: CardsProps;
	};
	tabs: TabsProps[];
	carousel?: {
		title: string;
		carouselItems?: CarouselProps['carouselItems'];
	};
	slug: string;
}

export async function getDataCampaignPages() {
	const projection = `{
		breadcrumbTitle,
		${heroQuery()},
		${taleReferenceQuery()},
		${assistanceQuery()},
		${supportBlockQuery()},
		${tabsQuery()},
		${carouselQuery()},
		"slug": slug.current,
		showFeedback,
	}`;

	const query = pageQuery({
		type: 'campaign-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
