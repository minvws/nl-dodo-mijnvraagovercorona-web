import { useSanityClient } from 'astro-sanity';
import {
	PageProps,
	pageQuery,
	heroQuery,
	HeroProps,
	AssistanceProps,
	assistanceQuery,
	supportBlockQuery,
	CardsProps,
	TaleCollectionProps,
	taleReferenceQuery,
} from './queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';
import { TabsProps, tabsQuery } from './queries/tabs';
import { CarouselProps, carouselQuery } from './queries/carousel';

export interface CampaignPageProps extends PageProps {
	hero: HeroProps;
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
		${heroQuery()},
		${taleReferenceQuery()},
		${assistanceQuery()},
		${supportBlockQuery()},
		${tabsQuery()},
		${carouselQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'campaign-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
