import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
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

export interface ThemePageProps extends PageProps {
	hero: HeroProps;
	overview: {
		title: string;
	};
	cards?: CardsProps;
	titleFlow: string;
	assistance: AssistanceProps;
	ctaButtonCollection: CtaButtonCollectionProps['ctaButtonCollection'];
	taleCollection: TaleCollectionProps['taleCollection'];
	alternatives: AlternativeTranslationsProps[];
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

	return getPageTranslations(data.pages);
}
