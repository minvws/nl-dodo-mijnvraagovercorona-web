import { ContentBlockProps } from '@design-system/components/ContentBlock';
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

export interface ThemePageProps
	extends PageProps,
		InterimQuestionCollectionProps {
	hero: HeroProps;
	titleFlow: string;
	assistance: AssistanceProps;
	questionCollection: InterimQuestionCollectionProps['questionCollection'];
	taleCollection: TaleCollectionProps['taleCollection'];
	slug: string;
	updatedAt: string;
}

export async function getDataThemes() {
	const projection = `{
		${heroQuery()},
		titleFlow,
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
