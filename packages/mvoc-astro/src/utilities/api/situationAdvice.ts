import { useSanityClient } from 'astro-sanity';
import { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
	imageQuery,
	tipsCollectionQuery,
} from './queries';

interface AnswerProps {
	showOn?: Array<number>;
	title: string;
	content: Object[];
}

interface AdviceProps {
	plan: {
		showOn?: Array<number>;
		day?: number;
		title: string;
		content: Object[];
	}[];
	cards: {
		title: string;
		chapeau: string;
		content: Object[];
		disclosure: {
			label: {
				this: string;
				that: string;
			};
			content: Object[];
		};
		buttons: {
			link?: string;
			situation?: string;
			text: string;
		}[];
	}[];
	title: string;
	secondaryTitle: string;
}

export interface PageSituationAdviceProps extends PageProps {
	header: {
		title: string;
		image: ImageProps;
		showSeriousSymptoms: boolean;
	};
	answer: AnswerProps[];
	advice: AdviceProps;
	slug: string;
}

export async function getDataSituationAdvice({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
		"header": {
			${localePropertyQuery({ name: 'title', path: 'header.title', locale })},
			${imageQuery({ name: 'image', path: `header.image` })},
			"showSeriousSymptoms": header.showSeriousSymptoms,
		},
		"answer": answer[]{
			showOn,
			${localePropertyQuery({ name: 'title', locale })},
			${localePropertyQuery({ name: 'content', locale, block: true })},
		},
		"advice": {
			${localePropertyQuery({
				name: 'title',
				path: 'advice.title',
				locale,
			})},
			"plan": advice.plan[]{
				showOn,
				day,
				${localePropertyQuery({ name: 'title', locale })},
				${localePropertyQuery({ name: 'content', locale, block: true })},
			},
			${localePropertyQuery({
				name: 'secondaryTitle',
				path: 'advice.secondaryTitle',
				locale,
			})},
			"cards": advice.cards[]->{
				${localePropertyQuery({ name: 'title', locale })},
				${localePropertyQuery({ name: 'chapeau', locale })},
				${localePropertyQuery({ name: 'content', locale, block: true })},
				"disclosure": {
					"label": {
						${localePropertyQuery({ name: 'this', path: 'disclosure.label.this', locale })},
						${localePropertyQuery({ name: 'that', path: 'disclosure.label.that', locale })},
					},
					${localePropertyQuery({
						name: 'content',
						path: 'disclosure.content',
						locale,
						block: true,
					})},
				},
				${tipsCollectionQuery({ locale })},
				"buttons": buttons[]{
					${localePropertyQuery({ name: 'text', locale })},
					${localePropertyQuery({ name: 'link', locale })},
					"situation": select(
						situation->_type == "situation-question-document" => 'situatie/' + situation->slug.current,
						situation->_type == "situation-result-document" => 'advies/' + situation->slug.current,
					),
				}
			}
		},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'situation-result-document',
		projection,
		locale,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
