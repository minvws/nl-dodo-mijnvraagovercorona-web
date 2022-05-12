import client, { ClientConfig } from '@sanity/client';
import { Locales } from './hooks';

/**
 * The configuration for Sanity
 * dataset specifies the dataset to be used
 * projectID is the id for the project we want to use the content from
 * useCDN whether to use the sanity CDN for api calls
 */
const options: ClientConfig = {
	dataset: 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
	useCdn: process.env.NODE_ENV === 'production' || false,
	apiVersion: '2022-03-23',
};

const followModals = (locale: string) => `{
		...,
		markDefs[]{
			...,
			_type == "dialog" => {
				"content": @.modal_ref->content.${locale},
				"title": @.modal_ref->title.${locale},
			}
		},
	}`;

/**
 * This helper function allows us to automatically extract the correct locale from a localized piece of content
 */
export const getLocaleProperty = ({
	name,
	path,
	array,
	locale,
	block,
}: {
	name: string;
	path?: string;
	array?: boolean;
	locale: string;
	block?: boolean;
}): string => {
	if (block) {
		if (array) {
			return `"${name}": ${path || name}[]{
				"nl": nl[]${followModals('nl')},
				"en": en[]${followModals('en')}
			}`;
		}

		return `"${name}": ${path || name}.${locale}[]${followModals(locale)}`;
	}

	return `"${name}": ${path || name}${array ? '[]' : ''}.${locale}`;
};

/**
 * This helper function allows us to get the unique file name of a sanity image
 */
export const getImage = ({
	name,
	path,
}: {
	name: string;
	path?: string;
}): string => {
	return `"${name}": "/images/sanity/" + ${
		path || name
	}.asset->sha1hash + "-" + ${path || name}.asset->originalFilename`;
};

/**
 * These props contain all the data returned by a content page query
 */
export type ContentPageProps = {
	page: {
		metaData: {
			title: string;
			description: string;
		};
		title: string;
		content: Array<Object>;
		url: string;
	};
	siteSettings: {
		pageTitleSuffix: string;
		url: string;
	};
	locale: Locales;
};

/**
 * This api call includes all the data for a content page including the generic site settings
 */
export const getContentPageQuery = async ({
	type,
	locale,
	site,
}: {
	type: string;
	locale: Locales;
	site: 'reizen-tijdens-corona' | 'quarantaine-check';
}): Promise<ContentPageProps> => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		${getLocaleProperty({ name: 'title', locale })},
		${getLocaleProperty({ name: 'content', locale, block: true })},
		url
	}`;

	return await sanityClient.fetch(
		getPageQuery({
			type,
			pageProjection,
			locale,
			site,
		}),
	);
};

const toStringArray = (array: Array<string>): string =>
	`[${array.map((item) => `"${item}"`).join(', ')}]`;

const toExcludeList = (array: Array<string>): string =>
	array.map((item) => ` && reference != "${item}"`).join('');

export const faqDocumentsQuery = ({
	locale,
	include,
	exclude,
}: {
	locale: string;
	include?: string[];
	exclude?: string[];
}) => `
	*[_type == "faq-document"${
		include ? ` && reference in ${toStringArray(include)}` : ''
	}${exclude ? toExcludeList(exclude) : ''}]{
		reference,
		reisfase,
		${getLocaleProperty({ name: 'vraag', locale })},
		${getLocaleProperty({ name: 'antwoord', locale, block: true })},
	} | order(order asc)`;

export const siteSettingsQuery = ({
	locale,
	site,
}: {
	locale: string;
	site: 'reizen-tijdens-corona' | 'quarantaine-check';
}): string => `
	*[_type == "site-settings-document" && site == "${site}"][0]{
		baseUrl,
		${getLocaleProperty({ name: 'pageTitleSuffix', locale })},
		"privacy": {
			${getLocaleProperty({ name: 'id', path: 'privacy.id', locale })},
			${getLocaleProperty({ name: 'usp', path: 'privacy.usp', locale })},
			${getLocaleProperty({ name: 'title', path: 'privacy.title', locale })},
			${getLocaleProperty({
				name: 'beloftes',
				path: 'privacy.beloftes',
				array: true,
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'logoAlt', path: 'header.logoAlt', locale })},
			${getLocaleProperty({ name: 'opnieuw', path: 'header.opnieuw', locale })},
			${getLocaleProperty({ name: 'terug', path: 'header.terug', locale })},
			${getLocaleProperty({ name: 'resultaat', path: 'header.resultaat', locale })},
		},
		"footer": {
			${getLocaleProperty({
				name: 'alleenSamenAlt',
				path: 'footer.alleenSamenAlt',
				locale,
			})},
			${getLocaleProperty({
				name: 'meerInformatieTitle',
				path: 'footer.meerInformatieTitle',
				locale,
			})},
			${getLocaleProperty({
				name: 'rijksoverheidText',
				path: 'footer.rijksoverheidText',
				locale,
			})},
			${getLocaleProperty({
				name: 'rijksoverheidUrl',
				path: 'footer.rijksoverheidUrl',
				locale,
			})},
      ${getLocaleProperty({
				name: 'footerText',
				path: 'footer.footerText',
				locale,
				block: true,
			})},
			${getLocaleProperty({ name: 'title', path: 'footer.title', locale })},
			"items": footer.items[]{
				url,
				${getLocaleProperty({ name: 'content', locale })},
			},
		},
		"feedback": {
			${getLocaleProperty({ name: 'button', path: 'feedback.button', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'feedback.content',
				locale,
				block: true,
			})},
			${getLocaleProperty({ name: 'title', path: 'feedback.title', locale })},
			${getLocaleProperty({ name: 'url', path: 'feedback.url', locale })},
			${getLocaleProperty({ name: 'thanks', path: 'feedback.thanks', locale })},
		},
		"ctaBlock": {
			${getLocaleProperty({ name: 'title', path: 'ctaBlock.title', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'ctaBlock.content',
				locale,
				block: true,
			})},
			${getLocaleProperty({ name: 'label', path: 'ctaBlock.label', locale })},
			"url": ctaBlock.url
		},
		"vervoersmiddelen": vervoersmiddelen[]{
			naam,
			${getLocaleProperty({ name: 'uitgebreid', locale })},
		},
		"quarantaineGids": {
			${getLocaleProperty({
				name: 'title',
				path: 'quarantaineGids.title',
				locale,
			})},
			${getLocaleProperty({
				name: 'button',
				path: 'quarantaineGids.button',
				locale,
			})},
			${getLocaleProperty({
				name: 'text',
				path: 'quarantaineGids.text',
				locale,
			})},
			${getLocaleProperty({
				name: 'url',
				path: 'quarantaineGids.url',
				locale,
			})},
		},
		"quarantaineCalendar": {
			${getLocaleProperty({
				name: 'dateSeperator',
				path: 'quarantaineCalendar.dateSeperator',
				locale,
			})},
			${getLocaleProperty({
				name: 'otherCalendar',
				path: 'quarantaineCalendar.otherCalendar',
				locale,
			})},
			${getLocaleProperty({
				name: 'title',
				path: 'quarantaineCalendar.title',
				locale,
			})},
			${getLocaleProperty({
				name: 'modalTitle',
				path: 'quarantaineCalendar.modalTitle',
				locale,
			})},
			${getLocaleProperty({
				name: 'modalBody',
				path: 'quarantaineCalendar.modalBody',
				locale,
			})},
			${getLocaleProperty({
				name: 'inviteTitle',
				path: 'quarantaineCalendar.inviteTitle',
				locale,
			})},
			${getLocaleProperty({
				name: 'inviteText',
				path: 'quarantaineCalendar.inviteText',
				locale,
			})},
		},
		"checkAgainCalendar": {
			${getLocaleProperty({
				name: 'modalTitle',
				path: 'checkAgainCalendar.modalTitle',
				locale,
			})},
			${getLocaleProperty({
				name: 'modalBody',
				path: 'checkAgainCalendar.modalBody',
				locale,
			})},
			${getLocaleProperty({
				name: 'inviteTitle',
				path: 'checkAgainCalendar.inviteTitle',
				locale,
			})},
			${getLocaleProperty({
				name: 'inviteText',
				path: 'checkAgainCalendar.inviteText',
				locale,
			})},
		},
		${getLocaleProperty({ name: 'quarantineOverviewTitle', locale })},
		${getLocaleProperty({ name: 'printCta', locale })},
		${getLocaleProperty({ name: 'agendaCta', locale })},
		${getLocaleProperty({ name: 'checkAgainCta', locale })},
		${getLocaleProperty({ name: 'favoriteCta', locale })},
		${getLocaleProperty({ name: 'GGDSpecialInstructions', locale })},
		${getLocaleProperty({ name: 'datumKiesTekst', locale })},
		${getLocaleProperty({ name: 'maanden', locale, array: true })},
		${getLocaleProperty({ name: 'dagen', locale, array: true })},
	}`;

/**
 * This query will only return the global site settings
 */
export const getSiteSettingsQuery = async ({
	locale,
	site,
}: {
	locale: string;
	site: 'reizen-tijdens-corona' | 'quarantaine-check';
}) => await sanityClient.fetch(siteSettingsQuery({ locale, site }));

/**
 * This query will return the global site settings and a list of requested faqs
 */
export const getFaqsQuery = async ({
	locale,
	include,
	exclude,
}: {
	locale: string;
	include?: string[];
	exclude?: string[];
}) =>
	await sanityClient.fetch(`{
		"siteSettings": ${siteSettingsQuery({ locale, site: 'reizen-tijdens-corona' })},
		"faqs": ${faqDocumentsQuery({ locale, include, exclude })},
	}`);

/**
 * This will create a Sanity GROQ Query for a specific page type
 */
export const getPageQuery = ({
	type,
	pageProjection,
	documentsQuery,
	locale,
	site,
	faqs,
}: {
	type: string;
	pageProjection: string;
	documentsQuery?: string;
	locale: string;
	site: 'reizen-tijdens-corona' | 'quarantaine-check';
	faqs?: {
		include?: string[];
		exclude?: string[];
	};
}): string => `{
	"page": *[_type == "${type}" && metaData.site == "${site}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site })},
	${
		faqs
			? `"faqs": ${faqDocumentsQuery({
					locale,
					include: faqs?.include,
					exclude: faqs?.exclude,
			  })},`
			: ''
	}
	${documentsQuery ? `"documents": ${documentsQuery}` : ''}
}`;

export const getAdvicePageQuery = ({
	type,
	pageProjection,
	locale,
	faqs,
}: {
	type: string;
	pageProjection: string;
	locale: Locales;
	faqs?: {
		include?: string[];
		exclude?: string[];
	};
}): string => `{
	"pages": *[_type == "${type}" && metaData.site == "reizen-tijdens-corona"]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'reizen-tijdens-corona' })},
	"faqs": ${faqDocumentsQuery({
		locale,
		include: faqs?.include,
		exclude: faqs?.exclude,
	})},
}`;

export const getSituationPageQuery = ({
	type,
	pageProjection,
	locale,
	situationSlug,
}: {
	type: string;
	pageProjection: string;
	locale: Locales;
	situationSlug: string;
}): string => `{
	"page": *[_type == "${type}" && metaData.site == "quarantaine-check" && url=="${situationSlug}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

/**
 * This will initialize the Sanity client
 */
export const sanityClient = client(options);
