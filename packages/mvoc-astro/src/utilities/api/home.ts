import { useSanityClient } from 'astro-sanity';
import { Locale } from '../locale/translation';
import {
	pageQuery,
	PageProps,
	imageQuery,
	localePropertyQuery,
	ImageProps,
} from './queries';

export interface PageHomeProps extends PageProps {
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		image: ImageProps;
	};
}

export async function getDataHome({ locale }: { locale: Locale }) {
	const projection = `{
		"header": {
			${localePropertyQuery({ name: 'title', path: 'header.title', locale })},
			${localePropertyQuery({ name: 'chapeau', path: 'header.chapeau', locale })},
			${localePropertyQuery({ name: 'subtitle', path: 'header.subtitle', locale })},
			${imageQuery({ name: 'image', path: 'header.image' })},
		},
	}`;

	const query = pageQuery({
		type: 'check-landing-page',
		projection,
		locale,
	});

	const data = await useSanityClient().fetch(query);
	return data;
}
