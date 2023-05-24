import { useSanityClient } from 'astro-sanity';
import {
	HeroProps,
	heroQuery,
	PageProps,
	pageQuery,
	TaleCollectionProps,
	taleReferenceQuery,
	CtaButtonCollectionProps,
	ctaButtonCollectionQuery,
	AssistanceProps,
	assistanceQuery,
	CardsProps,
	cardQuery,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface ThemePageProps extends PageProps {
	hero: HeroProps;
	overview: {
		title: string;
	};
	cards?: CardsProps;
	titleFlow: string;
	assistance: AssistanceProps;
	ctaButtonCollection: CtaButtonCollectionProps['ctaButtonCollection'];
	talesAsDisclosure?: boolean;
	taleCollection: TaleCollectionProps['taleCollection'];
	slug: string;
	updatedAt: string;
}

export async function getDataThemes() {
	const projection = `{
		${heroQuery()},
		overview{
			title,
		},
		${cardQuery()},
		titleFlow,
		${ctaButtonCollectionQuery()},
		${assistanceQuery()},
		talesAsDisclosure,
		${taleReferenceQuery()},
		"updatedAt": _updatedAt,
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'theme-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
