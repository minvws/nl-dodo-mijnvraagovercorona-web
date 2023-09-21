import { useSanityClient } from 'astro-sanity';
import type {
	PageProps,
	HeroProps,
	AssistanceProps,
	CardsProps,
} from './queries';
import {
	pageQuery,
	heroQuery,
	assistanceQuery,
	supportBlockQuery,
} from './queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';
import type { QuestionPageProps } from './question';
import { questionPageProjection } from './question';

export interface QuestionLandingPageProps extends PageProps {
	hero: HeroProps;
	breadcrumbTitle: string;
	questionReference: QuestionPageProps;
	assistance: AssistanceProps;
	support: {
		cards: CardsProps;
	};
	slug: string;
}

export async function getDataQuestionLandingPages() {
	const projection = `{
		breadcrumbTitle,
		${heroQuery()},
		questionReference->${questionPageProjection},
		${assistanceQuery()},
		${supportBlockQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'question-landing-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
