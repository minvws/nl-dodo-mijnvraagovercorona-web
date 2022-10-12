import { useSanityClient } from 'astro-sanity';
import { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
	imageQuery,
} from './queries';

interface AnswerProps {
	showOn?: Array<number>;
	title: string;
	content: Object[];
}

export interface PageSituationAdviceProps extends PageProps {
	header: {
		title: string;
		image: ImageProps;
		showSeriousSymptoms: boolean;
	};
	answer: AnswerProps[];
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
