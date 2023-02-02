import type { Locale } from '../../locale/translation';
import { metaDataQuery, MetaDataProps } from '.';

export interface PageProps {
	metaData: MetaDataProps;
}

/**
 * This will create a Sanity GROQ Query for a specific page type
 */
export const pageQuery = ({
	type,
	projection,
	locale,
	site,
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
	const siteConditional = site ? ` && metaData.site == "${site}"` : '';

	// prettier-ignore
	return `{
		"${multiple ? 'pages' : 'pageData'}": *[_type == "${type}"${siteConditional}${slugConditional}]${multiple ? '' : '[0]'} {
			...${projection},
			${metaDataQuery({locale})},
		},
	}`;
};
