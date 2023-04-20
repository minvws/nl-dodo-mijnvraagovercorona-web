import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { ImageProps, imageQuery } from './queries';
import {
	InterimQuestionCollectionProps,
	interimQuestionCollectionQuery,
	HeroProps,
	heroQuery,
	PageProps,
	pageQuery,
	TaleCollectionProps,
	taleReferenceQuery,
} from './queries/translated';
import {
	AssistanceProps,
	assistanceQuery,
} from './queries/translated/assistance';
import {
	CtaButtonCollectionProps,
	ctaButtonCollectionQuery,
} from './queries/translated/ctaButton';

export interface ThemePageProps
	extends PageProps,
		InterimQuestionCollectionProps {
	hero: HeroProps;
	titleFlow: string;
	assistance: AssistanceProps;
	ctaButtonCollection: CtaButtonCollectionProps['ctaButtonCollection'];
	questionCollection: InterimQuestionCollectionProps['questionCollection'];
	taleCollection: TaleCollectionProps['taleCollection'];
	alternatives: AlternativeTranslationsProps[];
	slug: string;
	updatedAt: string;
}

export async function getDataThemes() {
	const projection = `{
		${heroQuery()},
		titleFlow,
		${ctaButtonCollectionQuery()},
		${interimQuestionCollectionQuery()},
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
