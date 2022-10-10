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
	multiple = false,
}: {
	type: string;
	projection: string;
	locale: Locale;
	site?: 'mijn-vraag-over-corona';
	slug?: string;
	multiple?: boolean;
}): string => {
	const slugConditional = slug ? ` && slug.current=="${slug}"` : '';

	// prettier-ignore
	return `{
		"${multiple ? 'pages' : 'pageData'}": *[_type == "${type}" && metaData.site == "${site}"${slugConditional}]${multiple ? '' : '[0]'} {
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
};
