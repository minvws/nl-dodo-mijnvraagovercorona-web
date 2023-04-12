import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../../helpers/get-page-translations';
import {
	HeroProps,
	PageProps,
	customBlockQuery,
	heroQuery,
	pageQuery,
} from '../queries/translated';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';

interface AnswerProps {
	showOn?: Array<number>;
	title: string;
	content: ContentBlockProps['value'];
}

interface AdviceProps {
	plan?: {
		showOn?: Array<number>;
		day?: number;
		title: string;
		content: ContentBlockProps['value'];
	}[];
	// cards: CardProps[];
	title: string;
	secondaryTitle: string;
}

export interface AdvicePageProps extends PageProps {
	hero: HeroProps;
	showSeriousSymptoms: boolean;
	answer: AnswerProps[];
	advice: AdviceProps;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataAdvicePages() {
	const projection = `{
		${heroQuery()},
		showSeriousSymptoms,
		answer[]{
			showOn,
			title,
			${customBlockQuery({ name: 'content' })},
		},
		advice{
			title,
			plan[]{
				showOn,
				day,
				title,
				${customBlockQuery({ name: 'content' })},
			},
			secondaryTitle,
		},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'advice-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
