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
} from './queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';
import { QuestionPageProps, questionPageProjection } from './question';

export interface QuestionLandingPageProps extends PageProps {
	hero: HeroProps;
	questionReference: QuestionPageProps;
	assistance: AssistanceProps;
	support: {
		cards: CardsProps;
	};
	slug: string;
}

export async function getDataQuestionLandingPages() {
	const projection = `{
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
