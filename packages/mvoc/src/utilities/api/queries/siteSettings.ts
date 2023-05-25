import { useSanityClient } from 'astro-sanity';
import { Locale, locales } from 'src/utilities/locale/translation';
import {
	internalPageReferenceQuery,
	InternalPageCollectionProps,
	customBlockQuery,
	ImageProps,
	imageQuery,
} from '.';
import type { ContentBlockProps } from '@design-system/components/ContentBlock';

export interface SiteSettingsProps {
	baseUrl: string;
	pageTitleSuffix: string;
	socialShareImage: ImageProps;
	feedback: {
		button: string;
		content: string;
		thanks: string;
		title: string;
		url: string;
		labels: {
			like: string;
			dislike: string;
		};
	};
	masthead: {
		skiplink: string;
		menu: {
			landmarkLabel: string;
			menuButtonLabel: string;
			homeLabel: string;
			menuTitle: string;
			internalPageCollection: InternalPageCollectionProps['internalPageCollection'];
			extraMenu: {
				title: string;
				internalPageCollection: InternalPageCollectionProps['internalPageCollection'];
			};
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
	privacy: {
		id: string;
		usp: string;
		title: string;
		beloftes: string[];
	};
	localeSelector: {
		title: string;
		change: string;
		current: string;
	};
	genericLabels: {
		close: string;
		open: string;
		moreThan: string;
		in: string;
		today: string;
		ago: string;
		of: string;
		dayPlural: {
			this: string;
			that: string;
		};
		sources: string;
		moreInfo: string;
		updatedAt: string;
		map: string;
		list: string;
		all: string;
		situationPlural: {
			this: string;
			that: string;
		};
	};
	logo: {
		alt: string;
	};
	seeMoreExpand: {
		this: string;
		that: string;
	};
	severeSymptomsAdvice: {
		title: string;
		subtitle: string;
		icon: ImageProps;
	};
	forms: {
		filterOn: string;
		clearField: string;
	};
	vaccinations: {
		series: {
			b: string;
			b1: string;
		};
	};
	accessibility: {
		labelExternalLink: string;
		labelModal: string;
		labelModalClose: string;
	};
}

export const siteSettingsQuery = ({ locale }: { locale: Locale }): string => `
	*[_type == "siteSettings" && __i18n_lang == "${locale.id}"][0]{
		baseUrl,
		pageTitleSuffix,
		${imageQuery({ name: 'socialShareImage' })},
		masthead{
			skiplink,
			menu{
				landmarkLabel,
				menuButtonLabel,
				homeLabel,
				menuTitle,
				${internalPageReferenceQuery()},
				extraMenu{
					title,
					${internalPageReferenceQuery()},
				},
			},
		},
		mastfoot{
			title,
			columns[]{
				title,
				${customBlockQuery({ name: 'content' })},
				${internalPageReferenceQuery()},
			}
		},
		localeSelector{
			title,
			change,
			current,
		},
		genericLabels{
			close,
			open,
			moreThan,
			today,
			ago,
			in,
			of,
			dayPlural{
				this,
				that,
			},
			sources,
			moreInfo,
			updatedAt,
			map,
			list,
			all,
			situationPlural{
				this,
				that,
			},
		},
		logo{
			alt,
		},
		forms{
			filterOn,
			clearField,
		},
		vaccinations{
			series{
				b,
				b1,
			},
		},
		privacy{
			id,
			usp,
			title,
			beloftes,
		},
		feedback{
			button,
			content,
			title,
			url,
			thanks,
			labels{
				like,
				dislike,
			},
		},
		severeSymptomsAdvice{
			title,
			subtitle,
			${imageQuery({ name: 'icon' })},
		},
		accessibility{
			labelExternalLink,
			labelModal,
			labelModalClose,
		}
	}`;

/**
 * Function to use global siteSettings inside components
 *
 * Usage:
 * const siteSettingsTranslated: SiteSettingsProps = await useSiteSettings({ locale });
 */
let siteSettingsTranslated;
export async function useSiteSettings({ locale }: { locale: Locale }) {
	if (siteSettingsTranslated) {
		return siteSettingsTranslated[locale.id] || siteSettingsTranslated['en'];
	}

	siteSettingsTranslated = await Object.entries(locales).reduce(
		async (acc, [, value]) => ({
			...(await acc),
			[value.id]: await useSanityClient().fetch(
				siteSettingsQuery({ locale: value }),
			),
		}),
		{},
	);

	return siteSettingsTranslated[locale.id] || siteSettingsTranslated['en'];
}
