import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import {
	HeroProps,
	PageProps,
	heroQuery,
	pageQuery,
} from './queries/translated';
import {
	AssistanceProps,
	assistanceQuery,
} from './queries/translated/assistance';

export interface QuestionPageProps extends PageProps {
	hero: HeroProps;
	assistance: AssistanceProps;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataQuestionPages() {
	const projection = `{
		${heroQuery()},
		${assistanceQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'question-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
