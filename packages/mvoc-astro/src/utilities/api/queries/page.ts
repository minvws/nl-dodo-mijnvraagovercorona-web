import { Locale } from '../../locale/translation';
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
			${metaDataQuery({locale})},
		},
	}`;
};
