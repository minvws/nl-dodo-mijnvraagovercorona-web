import { Locale } from '../../locale/translation';
import {
	imageQuery,
	siteSettingsQuery,
	localePropertyQuery,
	ImageProps,
	SiteSettingsProps,
} from '.';

export interface PageProps {
	siteSettings: SiteSettingsProps;
	metaData: {
		title: string;
		description: 'string';
		socialShareImage: ImageProps;
	};
}

/**
 * This will create a Sanity GROQ Query for a specific page type
 */
export const pageQuery = ({
	type,
	projection,
	locale,
	site = 'mijn-vraag-over-corona',
	slug,
}: {
	type: string;
	projection: string;
	locale: Locale;
	site?: 'mijn-vraag-over-corona';
	slug?: string;
}): string => `{
	...*[_type == "${type}" && metaData.site == "${site}"${
	slug ? ` && slug.current=="${slug}"` : ``
}][0]{
		...${projection},
		"metaData": {
			${localePropertyQuery({ name: 'title', path: 'metaData.title', locale })},
			${localePropertyQuery({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
			${imageQuery({
				name: 'socialShareImage',
				path: 'metaData.socialShareImage',
			})},
		},
	},
	"siteSettings": ${siteSettingsQuery({ locale, site })},
}`;
