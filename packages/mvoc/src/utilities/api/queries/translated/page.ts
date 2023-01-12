import { Locale } from 'src/utilities/locale/translation';
import { MetaDataProps, metaDataQuery } from '.';

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
	slug,
	multiple = false,
}: {
	type: string;
	projection: string;
	locale?: Locale;
	slug?: string;
	multiple?: boolean;
}): string => {
	const slugConditional = slug ? ` && slug.current=="${slug}"` : '';
	const localeConditional = locale ? ` && __i18n_lang=="${locale.id}"` : '';

	// prettier-ignore
	return `{
		"${multiple ? 'pages' : 'pageData'}": *[_type == "${type}"${slugConditional}${localeConditional}]${multiple ? '' : '[0]'} {
			...${projection},
			${metaDataQuery()},
		},
	}`;
};
