import { useSanityClient } from 'astro-sanity';
import type { Locale } from 'src/utilities/locale/translation';
import { locales } from 'src/utilities/locale/translation';
import type { InternalPageCollectionProps, ImageProps } from '.';
import { internalPageReferenceQuery, customBlockQuery, imageQuery } from '.';
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
		feedbackMobile: {
			title: string;
			label: string;
			url: string;
		};
	};
	masthead: {
		skiplink: string;
		menu: {
			landmarkLabel: string;
			menuButtonLabel: string;
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
	videoPlayer?: {
		openVideo?: string;
		cookieBanner?: {
			title?: string;
			content?: ContentBlockProps['value'];
			watchOn?: string;
		};
	};
	genericLabels: {
		close: string;
		open: string;
		goTo: string;
		moreThan: string;
		in: string;
		today: string;
		ago: string;
		of: string;
		or: string;
		previous: string;
		next: string;
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
		decline?: string;
		accept?: string;
		situationPlural: {
			this: string;
			that: string;
		};
		search: string;
		kilometerAbbr: string;
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
	appointmentTypes: {
		pza: string;
		pma: string;
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
				${internalPageReferenceQuery()},
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
		videoPlayer{
			openVideo,
			cookieBanner{
				title,
				${customBlockQuery({ name: 'content' })},
				watchOn,
			},
		},
		genericLabels{
			close,
			open,
			goTo,
			moreThan,
			today,
			ago,
			in,
			of,
			or,
			previous,
			next,
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
			decline,
			accept,
			situationPlural{
				this,
				that,
			},
			search,
			kilometerAbbr,
		},
		logo{
			alt,
		},
		forms{
			filterOn,
			clearField,
		},
		appointmentTypes{
			pza,
			pma,
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
			feedbackMobile{
				title,
				label,
				url,
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
