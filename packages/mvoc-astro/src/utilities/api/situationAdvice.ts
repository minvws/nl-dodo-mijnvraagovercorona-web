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

import type { ContentBlockProps } from '@modules/ContentBlock';

export type InformContactsProps = {
	title: string;
	preButtonContent?: ContentBlockProps['value'];
	steps?: {
		title: string;
		content: ContentBlockProps['value'];
		points?: {
			title: string;
			content: ContentBlockProps['value'];
		}[];
	}[];
	buttons: {
		situation: string;
		copyButton: {
			label: string;
			labelCopied: string;
		};
		shareButton: {
			label: string;
			message: string;
		};
	};
	url: string;
};

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
	cards: {
		title: string;
		chapeau: string;
		content: ContentBlockProps['value'];
		disclosure: {
			label: {
				this: string;
				that: string;
			};
			content: ContentBlockProps['value'];
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
	informContacts: InformContactsProps;
	slug: string;
	updatedAt: string;
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
		"informContacts": {
			${localePropertyQuery({
				name: 'title',
				path: 'informContactsReference->title',
				locale,
			})},
			"steps": informContactsReference->steps[] {
				${localePropertyQuery({ name: 'title', locale })},
				${localePropertyQuery({ name: 'content', locale, block: true })},
				"points": points[] {
					${localePropertyQuery({ name: 'title', locale })},
					${localePropertyQuery({ name: 'content', locale, block: true })},
				}
			},
			${localePropertyQuery({
				name: 'preButtonContent',
				path: 'informContactsReference->preButtonContent',
				locale,
				block: true,
			})},
			"buttons": informContactsReference->buttons {
				"situation": select(
					situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
					situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
				),
				"shareButton": {
					${localePropertyQuery({ name: 'label', path: 'shareButton.label', locale })},
					${localePropertyQuery({
						name: 'message',
						path: 'shareButton.message',
						locale,
					})},
				},
				"copyButton": {
					${localePropertyQuery({ name: 'label', path: 'copyButton.label', locale })},
					${localePropertyQuery({
						name: 'labelCopied',
						path: 'copyButton.labelCopied',
						locale,
					})},
				}
			}
		},

		"updatedAt": _updatedAt,
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
