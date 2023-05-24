import { Locale } from 'src/utilities/locale/translation';
import {
	MetaDataProps,
	SubFolderReferenceProps,
	metaDataQuery,
	subFolderReferenceQuery,
} from '.';
import {
	AlternativeTranslationsProps,
	BreadcrumbProps,
} from 'src/utilities/helpers/getAdditionalPageData';

export interface PageProps extends SubFolderReferenceProps {
	type: string;
	metaData: MetaDataProps;
	updatedAt: string;
	id: string;
	localeID: string;
	base_ref: string;
	theme: {
		slug: string;
	};
	alternatives: AlternativeTranslationsProps[];
	breadcrumbs: BreadcrumbProps[];
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
		"${multiple ? 'pages' : 'pageData'}": *[_type == "${type}" && (!defined(generatePage) || generatePage == true)${slugConditional}${localeConditional}]${multiple ? '' : '[0]'} {
			"type": _type,
			"updatedAt": _updatedAt,
			"localeID": __i18n_lang,
			"base_ref": __i18n_base._ref,
			"id": _id,
			theme->{
				"slug": slug.current,
			},
			${subFolderReferenceQuery()},
			...${projection},
			${metaDataQuery()},
		},
	}`;
};
