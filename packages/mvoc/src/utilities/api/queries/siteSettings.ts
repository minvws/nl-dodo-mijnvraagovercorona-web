import { useSanityClient } from 'astro-sanity';
import type { Locale } from 'src/utilities/locale/translation';
import { locales } from 'src/utilities/locale/translation';
import type { InternalPageCollectionProps, ImageProps, PictureProps } from '.';
import { internalPageReferenceQuery, customBlockQuery, imageQuery } from '.';
import type { ContentBlockProps } from '@modules/ContentBlock';
import {
	setGlobalData,
	type GlobalDataByLocale,
	availableLocales,
} from '@mvoc/ui/helpers';

interface SiteSettings {
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
		and: string;
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
		icon: PictureProps['image'];
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
			and,
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

let siteSettingsTranslated;
async function storeSiteSettings() {
	if (siteSettingsTranslated) return;

	siteSettingsTranslated = await Object.entries(locales).reduce(
		async (acc, [, value]) => ({
			...(await acc),
			[value.id]: await useSanityClient().fetch(
				siteSettingsQuery({ locale: value }),
			),
		}),
		{},
	);
}

/**
 * Function to use global siteSettings inside components
 *
 * Usage:
 * const sitesettings = await useSiteSettings({ locale });
 */
export async function useSiteSettings({
	locale,
}: {
	locale: Locale;
}): Promise<SiteSettings> {
	await storeSiteSettings();

	return siteSettingsTranslated[locale.id] || siteSettingsTranslated['en'];
}

/**
 * Pass siteSettings to UI global data
 */
export async function setUIGlobalDataFromSiteSettings() {
	await storeSiteSettings();

	// Map our siteSettings to the global data in UI
	const data = availableLocales.reduce((acc, locale) => {
		return {
			...acc,
			[locale.id]: {
				logoAlt: siteSettingsTranslated[locale.id].logo.alt,
				close: siteSettingsTranslated[locale.id].genericLabels.close,
				updatedAt: siteSettingsTranslated[locale.id].genericLabels.updatedAt,
				clearField: siteSettingsTranslated[locale.id].forms.clearField,
				previous: siteSettingsTranslated[locale.id].genericLabels.previous,
				next: siteSettingsTranslated[locale.id].genericLabels.next,
				goTo: siteSettingsTranslated[locale.id].genericLabels.goTo,
				openVideo: siteSettingsTranslated[locale.id].videoPlayer?.openVideo,
				mainNavigation: {
					landmark:
						siteSettingsTranslated[locale.id]?.masthead?.menu?.landmarkLabel,
					homeLabel:
						siteSettingsTranslated[locale.id]?.masthead?.menu?.homeLabel,
				},
				localeSelector: {
					title: siteSettingsTranslated[locale.id].localeSelector.title,
					change: siteSettingsTranslated[locale.id].localeSelector.change,
					current: siteSettingsTranslated[locale.id].localeSelector.current,
				},
				feedback: {
					title: siteSettingsTranslated[locale.id].feedback.title,
					titleMobile:
						siteSettingsTranslated[locale.id].feedback?.feedbackMobile?.title,
					content: siteSettingsTranslated[locale.id].feedback.content,
					button: siteSettingsTranslated[locale.id].feedback.button,
					href: siteSettingsTranslated[locale.id].feedback?.url,
					like: siteSettingsTranslated[locale.id].feedback.labels.like,
					dislike: siteSettingsTranslated[locale.id].feedback.labels.dislike,
					thanks: siteSettingsTranslated[locale.id].feedback.thanks,
				},
			},
		};
	}, {} as GlobalDataByLocale);

	setGlobalData(data);
}
