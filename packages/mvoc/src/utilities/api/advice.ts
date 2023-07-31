import { useSanityClient } from 'astro-sanity';
import {
	ButtonsProps,
	HeroProps,
	MoreInfoProps,
	PageProps,
	buttonsQuery,
	customBlockQuery,
	heroQuery,
	moreInfoQuery,
	pageQuery,
	AssistanceProps,
	assistanceQuery,
	supportBlockQuery,
	CardsProps,
} from './queries';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

interface CardProps {
	title: string;
	chapeau: string;
	content: ContentBlockProps['value'];
	buttons: ButtonsProps;
}

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
	cards?: {
		title?: string;
		items?: CardProps[];
	};
	title: string;
}

export interface AdvicePageProps extends PageProps {
	hero: HeroProps;
	showSeriousSymptoms: boolean;
	answer: AnswerProps[];
	advice: AdviceProps;
	locale: string;
	support: {
		cards: CardsProps;
	};
	assistance: AssistanceProps;
	moreInfo: MoreInfoProps;
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
			cards{
				title,
				items[]->{
					title,
					chapeau,
					${customBlockQuery({ name: 'content' })},
					${buttonsQuery({ array: true })},
				},
			},
		},
		${assistanceQuery()},
		${supportBlockQuery()},
		${moreInfoQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'advice-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
