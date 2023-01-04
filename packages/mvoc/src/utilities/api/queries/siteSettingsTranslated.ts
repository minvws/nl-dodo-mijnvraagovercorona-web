import { useSanityClient } from 'astro-sanity';
import { Locale, locales } from 'src/utilities/locale/translation';
import {
	imageQuery,
	ImageProps,
	internalPageReferenceQuery,
	InternalPageCollectionProps,
	customBlockQuery,
} from '.';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';

export interface SiteSettingsTranslatedProps {
	masthead: {
		skiplink: string;
		menu: {
			homeLabel: string;
			internalPageCollection: InternalPageCollectionProps['internalPageCollection'];
		};
	};
	mastfoot: {
		title: string;
		columns: {
			title: string;
			content: ContentBlockProps['value'] | null;
			internalPageCollection: InternalPageCollectionProps['internalPageCollection'];
		}[];
	};
	logo: {
		alt: string;
	};
}

export const siteSettingsTranslatedQuery = ({
	locale,
}: {
	locale: Locale;
}): string => `
	*[_type == "siteSettings" && __i18n_lang == "${locale.id}"][0]{
		masthead{
			skipLink,
			menu{
				homeLabel,
				${internalPageReferenceQuery({ locale })},
			},
		},
		mastfoot{
			title,
			columns[]{
				title,
				${customBlockQuery({ name: 'content', locale })},
				${internalPageReferenceQuery({ locale })},
			}
		},
		logo{
			alt,
		},
	}`;

/**
 * Function to use global siteSettings inside components
 *
 * Usage:
 * const siteSettingsTranslated: SiteSettingsTranslatedProps = await useSiteSettingsTranslated({ locale });
 */
let siteSettingsTranslated;
export async function useSiteSettingsTranslated({
	locale,
}: {
	locale: Locale;
}) {
	if (siteSettingsTranslated) {
		return siteSettingsTranslated[locale.id];
	}

	siteSettingsTranslated = await Object.entries(locales).reduce(
		async (acc, [, value]) => ({
			...(await acc),
			[value.id]: await useSanityClient().fetch(
				siteSettingsTranslatedQuery({ locale: value }),
			),
		}),
		{},
	);

	return siteSettingsTranslated[locale.id];
}
