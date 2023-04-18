import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	imageQuery,
} from './queries';

import type { Props as AnswersSingleProps } from '@modules/forms/situations/AnswersSingle.astro';
import type { Props as FormSwitchProps } from '@modules/forms/situations/FormSwitch.astro';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AssistanceProps, assistanceQuery } from './queries/assistance';

export interface SituationQuestionPageProps {
	header: {
		title: string;
		content: ContentBlockProps['value'];
	};
	content: AnswersSingleProps['content'];
	type: FormSwitchProps['type'];
	answersSingle: FormSwitchProps['answersSingle'];
	answersMultiple: FormSwitchProps['answersMultiple'];
	showMore: FormSwitchProps['showMore'];
	buttons: FormSwitchProps['buttons'];
	assistance: AssistanceProps;
	label: string;
}

export interface PageSituationQuestionProps
	extends PageProps,
		SituationQuestionPageProps {
	slug: string;
}

export const getEssentialQuestionPageProjection = ({
	locale,
}: {
	locale: Locale;
}) => {
	return `
		"header": {
			${localePropertyQuery({ name: 'title', path: `header.title`, locale })},
			${localePropertyQuery({
				name: 'content',
				path: `header.content`,
				locale,
				block: true,
			})},
		},
		type,
		"content": {
			${localePropertyQuery({
				name: 'contentPrimary',
				path: `contentReference->content.contentPrimary`,
				locale,
				block: true,
			})},
			${imageQuery({
				name: 'imagePrimary',
				path: `contentReference->content.imagePrimary`,
			})},
			${localePropertyQuery({
				name: 'contentSecondary',
				path: `contentReference->content.contentSecondary`,
				locale,
				block: true,
			})},
			${imageQuery({
				name: 'imageSecondary',
				path: `contentReference->content.imageSecondary`,
			})},
		},
		"answersSingle": answersSingle[]{
			_key,
			${localePropertyQuery({ name: 'content', locale })},
			"next": select(
				next->_type == "situation-question-document" => {
					"type": next->_type,
					"slug": 'situatie/' + next->slug.current,
				},
				next->_type == "situation-result-document" => {
					"type": next->_type,
					"slug": 'advies/' + next->slug.current,
					"answer": next->answer[]{
						showOn,
					},
					"plan": next->advice.plan[]{
						showOn,
						day,
					},
				},
			),
		},
		"answersMultiple": answersMultiple[]{
			_key,
			${localePropertyQuery({ name: 'content', locale })},
		},
		"showMore": {
			"max": showMore.max,
			"label": {
				${localePropertyQuery({
					name: 'this',
					path: 'showMore.label.this',
					locale,
				})},
				${localePropertyQuery({
					name: 'that',
					path: 'showMore.label.that',
					locale,
				})},
			},
		},
		${localePropertyQuery({
			name: 'label',
			locale,
		})},
		"buttons": buttons[]{
			_key,
			${localePropertyQuery({ name: 'text', locale })},
			standard,
			assistanceDialog,
			"next": select(
				next->_type == "situation-question-document" => {
					"type": next->_type,
					"slug": 'situatie/' + next->slug.current,
				},
				next->_type == "situation-result-document" => {
					"type": next->_type,
					"slug": 'advies/' + next->slug.current,
					"answer": next->answer[]{
						showOn,
					},
					"plan": next->advice.plan[]{
						showOn,
						day,
					},
				},
			),
		},
		${assistanceQuery({ locale })}
	`;
};

export async function getDataSituationQuestions({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
		${getEssentialQuestionPageProjection({ locale })},
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'situation-question-document',
		projection,
		locale,
		slug,
		multiple: true,
		site: 'mijn-vraag-over-corona',
	});

	return await useSanityClient().fetch(query);
}
