import { useSanityClient } from 'astro-sanity';
import { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	localePropertyQuery,
	ImageProps,
} from './queries';

export interface PageSituationQuestionProps extends PageProps {
	header: {
		title: string;
		content: Object[];
		image: ImageProps;
	};
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
