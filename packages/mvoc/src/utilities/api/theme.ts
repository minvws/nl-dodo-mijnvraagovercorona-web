import { useSanityClient } from 'astro-sanity';
import type {
	HeroProps,
	PageProps,
	TaleCollectionProps,
	CtaButtonCollectionProps,
	AssistanceProps,
	CardsProps,
} from './queries';
import {
	heroQuery,
	pageQuery,
	taleReferenceQuery,
	ctaButtonCollectionQuery,
	assistanceQuery,
	cardQuery,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface ThemePageProps extends PageProps {
	hero: HeroProps;
	breadcrumbTitle: string;
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

export const themePageProjection = `{
	breadcrumbTitle,
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

export async function getDataThemes() {
	const query = pageQuery({
		type: 'theme-page',
		projection: themePageProjection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
