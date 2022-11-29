import { useSanityClient } from 'astro-sanity';
import { Locale, locales } from 'src/utilities/locale/translation';
import { localePropertyQuery, imageQuery, ImageProps } from './';

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
	ctaBlock: {
		title: string;
		content: string;
		label: string;
		url: string;
	};
	footer: {
		footerMainTitle: string;
		alleenSamenAlt: string;
		items: {
			url: string;
			content: string;
		}[];
		meerInformatieTitle: string;
		rijksoverheidText: string;
		rijksoverheidUrl: string;
		title: string;
		footerText: ContentBlockProps['value'];
	};
	header: {
		logoAlt: string;
		opnieuw: string;
		terug: string;
		resultaat: string;
		skipLink: string;
		localeSelector: {
			change: string;
			current: string;
		};
	};
	privacy: {
		id: string;
		usp: string;
		title: string;
		beloftes: string[];
	};
	quarantaineCalendar: {
		dateSeperator: string;
		otherCalendar: string;
		title: string;
		modalTitle: string;
		modalBody: string;
		inviteTitle: string;
		inviteText: string;
	};
	checkAgainCalendar: {
		modalTitle: string;
		modalBody: string;
		inviteTitle: string;
		inviteText: string;
	};
	printCta: string;
	checkAgainCta: string;
	agendaCta: string;
	dagen: string[];
	datumKiesTekst: string;
	maanden: string[];
	updatedAt: string;
	situationPlural: {
		this: string;
		that: string;
	};
	seeMoreExpand: {
		this: string;
		that: string;
	};
	sources: string;
	moreTips: string;
	severeSymptomsAdvice: {
		title: string;
		subtitle: string;
		icon: ImageProps;
	};
	contentVariables: {
		vaccinatiejaar: string;
	};
	accessibility: {
		labelExternalLink: string;
		labelModal: string;
		labelModalClose: string;
	};
}

export const siteSettingsQuery = ({
	locale,
	site,
}: {
	locale: Locale;
	site: 'mijn-vraag-over-corona';
}): string => `
	*[_type == "site-settings-document" && site == "${site}"][0]{
		baseUrl,
		${localePropertyQuery({ name: 'pageTitleSuffix', locale })},
		${imageQuery({ name: 'socialShareImage' })},
		"privacy": {
			${localePropertyQuery({ name: 'id', path: 'privacy.id', locale })},
			${localePropertyQuery({ name: 'usp', path: 'privacy.usp', locale })},
			${localePropertyQuery({ name: 'title', path: 'privacy.title', locale })},
			${localePropertyQuery({
				name: 'beloftes',
				path: 'privacy.beloftes',
				array: true,
				locale,
			})},
		},
		"header": {
			${localePropertyQuery({ name: 'logoAlt', path: 'header.logoAlt', locale })},
			${localePropertyQuery({ name: 'opnieuw', path: 'header.opnieuw', locale })},
			${localePropertyQuery({ name: 'terug', path: 'header.terug', locale })},
			${localePropertyQuery({ name: 'resultaat', path: 'header.resultaat', locale })},
			${localePropertyQuery({ name: 'skipLink', path: 'header.skipLink', locale })},
			"localeSelector": {
				${localePropertyQuery({
					name: 'change',
					path: 'header.localeSelector.change',
					locale,
				})},
				${localePropertyQuery({
					name: 'current',
					path: 'header.localeSelector.current',
					locale,
				})},
			},
		},
		"footer": {
			${localePropertyQuery({
				name: 'footerMainTitle',
				path: 'footer.footerMainTitle',
				locale,
			})},
			${localePropertyQuery({
				name: 'alleenSamenAlt',
				path: 'footer.alleenSamenAlt',
				locale,
			})},
			${localePropertyQuery({
				name: 'meerInformatieTitle',
				path: 'footer.meerInformatieTitle',
				locale,
			})},
			${localePropertyQuery({
				name: 'rijksoverheidText',
				path: 'footer.rijksoverheidText',
				locale,
			})},
			${localePropertyQuery({
				name: 'rijksoverheidUrl',
				path: 'footer.rijksoverheidUrl',
				locale,
			})},
      ${localePropertyQuery({
				name: 'footerText',
				path: 'footer.footerText',
				locale,
				block: true,
			})},
			${localePropertyQuery({ name: 'title', path: 'footer.title', locale })},
			"items": footer.items[]{
				url,
				${localePropertyQuery({ name: 'content', locale })},
			},
		},
		"feedback": {
			${localePropertyQuery({ name: 'button', path: 'feedback.button', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'feedback.content',
				locale,
				block: true,
			})},
			${localePropertyQuery({ name: 'title', path: 'feedback.title', locale })},
			${localePropertyQuery({ name: 'url', path: 'feedback.url', locale })},
			${localePropertyQuery({ name: 'thanks', path: 'feedback.thanks', locale })},
			"labels": {
				${localePropertyQuery({ name: 'like', path: 'feedback.labels.like', locale })},
				${localePropertyQuery({
					name: 'dislike',
					path: 'feedback.labels.dislike',
					locale,
				})},
			},
		},
		"ctaBlock": {
			${localePropertyQuery({ name: 'title', path: 'ctaBlock.title', locale })},
			${localePropertyQuery({
				name: 'content',
				path: 'ctaBlock.content',
				locale,
				block: true,
			})},
			${localePropertyQuery({ name: 'label', path: 'ctaBlock.label', locale })},
			"url": ctaBlock.url
		},
		"vervoersmiddelen": vervoersmiddelen[]{
			naam,
			${localePropertyQuery({ name: 'uitgebreid', locale })},
		},
		"quarantaineGids": {
			${localePropertyQuery({
				name: 'title',
				path: 'quarantaineGids.title',
				locale,
			})},
			${localePropertyQuery({
				name: 'button',
				path: 'quarantaineGids.button',
				locale,
			})},
			${localePropertyQuery({
				name: 'text',
				path: 'quarantaineGids.text',
				locale,
			})},
			${localePropertyQuery({
				name: 'url',
				path: 'quarantaineGids.url',
				locale,
			})},
		},
		"quarantaineCalendar": {
			${localePropertyQuery({
				name: 'dateSeperator',
				path: 'quarantaineCalendar.dateSeperator',
				locale,
			})},
			${localePropertyQuery({
				name: 'otherCalendar',
				path: 'quarantaineCalendar.otherCalendar',
				locale,
			})},
			${localePropertyQuery({
				name: 'title',
				path: 'quarantaineCalendar.title',
				locale,
			})},
			${localePropertyQuery({
				name: 'modalTitle',
				path: 'quarantaineCalendar.modalTitle',
				locale,
			})},
			${localePropertyQuery({
				name: 'modalBody',
				path: 'quarantaineCalendar.modalBody',
				locale,
			})},
			${localePropertyQuery({
				name: 'inviteTitle',
				path: 'quarantaineCalendar.inviteTitle',
				locale,
			})},
			${localePropertyQuery({
				name: 'inviteText',
				path: 'quarantaineCalendar.inviteText',
				locale,
			})},
		},
		"checkAgainCalendar": {
			${localePropertyQuery({
				name: 'modalTitle',
				path: 'checkAgainCalendar.modalTitle',
				locale,
			})},
			${localePropertyQuery({
				name: 'modalBody',
				path: 'checkAgainCalendar.modalBody',
				locale,
			})},
			${localePropertyQuery({
				name: 'inviteTitle',
				path: 'checkAgainCalendar.inviteTitle',
				locale,
			})},
			${localePropertyQuery({
				name: 'inviteText',
				path: 'checkAgainCalendar.inviteText',
				locale,
			})},
		},
		${localePropertyQuery({ name: 'quarantineOverviewTitle', locale })},
		${localePropertyQuery({ name: 'printCta', locale })},
		${localePropertyQuery({ name: 'agendaCta', locale })},
		${localePropertyQuery({ name: 'checkAgainCta', locale })},
		${localePropertyQuery({ name: 'favoriteCta', locale })},
		${localePropertyQuery({ name: 'GGDSpecialInstructions', locale })},
		${localePropertyQuery({ name: 'datumKiesTekst', locale })},
		${localePropertyQuery({ name: 'maanden', locale, array: true })},
		${localePropertyQuery({ name: 'dagen', locale, array: true })},
		${localePropertyQuery({ name: 'updatedAt', locale })},
		"situationPlural": {
			${localePropertyQuery({
				name: 'this',
				path: 'situationPlural.this',
				locale,
			})},
			${localePropertyQuery({
				name: 'that',
				path: 'situationPlural.that',
				locale,
			})},
		},
		"seeMoreExpand": {
			${localePropertyQuery({
				name: 'this',
				path: 'seeMoreExpand.this',
				locale,
			})},
			${localePropertyQuery({
				name: 'that',
				path: 'seeMoreExpand.that',
				locale,
			})},
		},
		${localePropertyQuery({
			name: 'sources',
			locale,
		})},
		${localePropertyQuery({
			name: 'moreTips',
			locale,
		})},
		"severeSymptomsAdvice": {
			${localePropertyQuery({
				name: 'title',
				path: 'severeSymptomsAdvice.title',
				locale,
			})},
			${localePropertyQuery({
				name: 'subtitle',
				path: 'severeSymptomsAdvice.subtitle',
				locale,
			})},
			${imageQuery({ name: 'icon', path: `severeSymptomsAdvice.icon` })},
		},
		"contentVariables": {
			"vaccinatiejaar": contentVariables.vaccinatiejaar,
		},
		"accessibility": {
			${localePropertyQuery({
				name: 'labelExternalLink',
				path: 'accessibility.labelExternalLink',
				locale,
			})},
			${localePropertyQuery({
				name: 'labelModal',
				path: 'accessibility.labelModal',
				locale,
			})},
			${localePropertyQuery({
				name: 'labelModalClose',
				path: 'accessibility.labelModalClose',
				locale,
			})},
		}
	}`;

/**
 * Function to use global siteSettings inside components
 *
 * Usage:
 * const siteSettings: SiteSettingsProps = await useSiteSettings({ locale });
 */
let siteSettings;
export async function useSiteSettings({
	locale,
	site = 'mijn-vraag-over-corona',
}: {
	locale: Locale;
	site?: 'mijn-vraag-over-corona';
}) {
	if (siteSettings) {
		return siteSettings[locale.id];
	}

	siteSettings = await Object.entries(locales).reduce(
		async (acc, [, value]) => ({
			...(await acc),
			[value.id]: await useSanityClient().fetch(
				siteSettingsQuery({ locale: value, site }),
			),
		}),
		{},
	);

	return siteSettings[locale.id];
}
