import { Locale } from 'src/utilities/locale/translation';
import { MetaDataProps, metaDataQuery } from '.';

export interface PageProps {
	metaData: MetaDataProps;
	id: string;
	localeID: string;
	base_ref: string;
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
			"localeID": __i18n_lang,
			"base_ref": __i18n_base._ref,
			"id": _id,
			...${projection},
			${metaDataQuery()},
		},
	}`;
};
