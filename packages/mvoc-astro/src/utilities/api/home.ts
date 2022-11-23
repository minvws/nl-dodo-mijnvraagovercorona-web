import { ContentBlockProps } from '@modules/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	imageQuery,
	localePropertyQuery,
	ImageProps,
} from './queries';

interface ImportantProps /*extends QuestionCollectionProps*/ {
	title: string;
	content: ContentBlockProps['value'];
	icon: ImageProps;
}

export interface PageHomeProps extends PageProps {
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		image: ImageProps;
	};
	important: ImportantProps;
}

export async function getDataHome({ locale }: { locale: Locale }) {
	const projection = `{
		"header": {
			${localePropertyQuery({ name: 'title', path: 'header.title', locale })},
			${localePropertyQuery({ name: 'chapeau', path: 'header.chapeau', locale })},
			${localePropertyQuery({ name: 'subtitle', path: 'header.subtitle', locale })},
			${imageQuery({ name: 'image', path: 'header.image' })},
		},
		"important": {
			${localePropertyQuery({ name: 'title', path: 'important.title', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'important.content',
				locale,
				block: true,
			})},
			${imageQuery({ name: 'icon', path: 'important.icon' })},
		},
	}`;

	const query = pageQuery({
		type: 'check-landing-page',
		projection,
		locale,
	});

	return await useSanityClient().fetch(query);
}
