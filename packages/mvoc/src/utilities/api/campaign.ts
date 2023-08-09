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

export interface CampaignPageProps extends PageProps {
	hero: HeroProps;
	assistance: AssistanceProps;
	taleCollection: TaleCollectionProps['taleCollection'];
	support: {
		cards: CardsProps;
	};
	slug: string;
}

export async function getDataCampaignPages() {
	const projection = `{
		${heroQuery()},
		${taleReferenceQuery()},
		${assistanceQuery()},
		${supportBlockQuery()},
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
