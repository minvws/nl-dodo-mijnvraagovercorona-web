import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
} from './queries';

import type { Props as FormSwitchProps } from '@modules/forms/situations/FormSwitch.astro';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';

export interface PageSituationQuestionProps extends PageProps {
	header: {
		title: string;
		content: ContentBlockProps['value'];
		image: ImageProps;
	};
	type: FormSwitchProps['type'];
	answersSingle: FormSwitchProps['answersSingle'];
	answersMultiple: FormSwitchProps['answersMultiple'];
	showMore: FormSwitchProps['showMore'];
	buttons: FormSwitchProps['buttons'];
	slug: string;
}

export async function getDataSituationQuestions({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
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
		"answersSingle": answersSingle[]{
			_key,
			${localePropertyQuery({ name: 'content', locale })},
			"next": select(
				next->_type == "situation-question-document" => 'situatie/' + next->slug.current,
				next->_type == "situation-result-document" => 'advies/' + next->slug.current,
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
		"buttons": buttons[]{
			_key,
			${localePropertyQuery({ name: 'text', locale })},
			standard,
			assistanceDialog,
			"next": select(
				next->_type == "situation-question-document" => 'situatie/' + next->slug.current,
				next->_type == "situation-result-document" => 'advies/' + next->slug.current,
			),
		},
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'situation-question-document',
		projection,
		locale,
		slug,
		multiple: true,
	});

	return await useSanityClient().fetch(query);
}
