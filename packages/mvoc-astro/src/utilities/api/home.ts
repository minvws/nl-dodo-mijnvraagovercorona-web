import { useSanityClient } from 'astro-sanity';
import { getImage, getLocaleProperty, SanityImageProps } from './base';

export interface PageContentHome {
	metaData: {
		title: string;
		description: 'string';
		socialShareImage: SanityImageProps;
	};
}

export async function getDataHome({ locale }) {
	const query = `{"pageContent": *[_type == "check-landing-page"][0]{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
			${getImage({
				name: 'socialShareImage',
				path: 'metaData.socialShareImage',
			})},
		},
	}}`;
	const data = await useSanityClient().fetch(query);
	return data;
}
