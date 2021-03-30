import client, { ClientConfig } from '@sanity/client';

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
};

/**
 * This helper function allows us to automatically extract the correct locale from a localized piece of content
 */
export const getLocaleProperty = ({
	name,
	path,
	array,
	locale,
}: {
	name: string;
	path?: string;
	array?: boolean;
	locale: 'nl' | 'en';
}): string => `"${name}": ${path || name}${array ? '[]' : ''}.${locale}`;

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
	locale: 'nl' | 'en';
};

/**
 * This api call includes all the data for a content page including the generic site settings
 */
export const getContentPageQuery = async ({
	type,
	locale,
}: {
	type: string;
	locale: 'nl' | 'en';
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
		${getLocaleProperty({ name: 'content', locale })},
		url
	}`;

	return await sanityClient.fetch(
		getPageQuery({
			type,
			pageProjection,
			locale,
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
	locale: 'nl' | 'en';
	include?: string[];
	exclude?: string[];
}) => `
	*[_type == "faq-document"${
		include ? ` && reference in ${toStringArray(include)}` : ''
	}${exclude ? toExcludeList(exclude) : ''}]{
		reference,
		reisfase,
		${getLocaleProperty({ name: 'vraag', locale })},
		${getLocaleProperty({ name: 'antwoord', locale })},
	} | order(order asc)`;

  const siteSettingsQuery = ({ locale }: { locale: 'nl' | 'en' }): string => `
	*[_type == "site-settings-document" && site == "reizen-tijdens-corona"][0]{
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
			${getLocaleProperty({ name: 'title', path: 'footer.title', locale })},
			${getLocaleProperty({
				name: 'items',
				path: 'footer.items',
				array: true,
				locale,
			})},
		},
		"feedback": {
			${getLocaleProperty({ name: 'button', path: 'feedback.button', locale })},
			${getLocaleProperty({ name: 'content', path: 'feedback.content', locale })},
			${getLocaleProperty({ name: 'title', path: 'feedback.title', locale })},
			${getLocaleProperty({ name: 'url', path: 'feedback.url', locale })},
		},
		"vervoersmiddelen": vervoersmiddelen[]{
			naam,
			${getLocaleProperty({ name: 'uitgebreid', locale })},
		}
	}`;

/**
 * This query will only return the global site settings
 */
export const getSiteSettingsQuery = async ({
	locale,
}: {
	locale: 'nl' | 'en';
}) => await sanityClient.fetch(siteSettingsQuery({ locale }));

/**
 * This query will return the global site settings and a list of requested faqs
 */
export const getFaqsQuery = async ({
	locale,
	include,
	exclude,
}: {
	locale: 'nl' | 'en';
	include?: string[];
	exclude?: string[];
}) =>
	await sanityClient.fetch(`{
		"siteSettings": ${siteSettingsQuery({ locale })},
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
	faqs,
}: {
	type: string;
	pageProjection: string;
	documentsQuery?: string;
	locale: 'nl' | 'en';
	faqs?: {
		include?: string[];
		exclude?: string[];
	};
}): string => `{
	"page": *[_type == "${type}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale })},
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

/**
 * This will initialize the Sanity client
 */
export const sanityClient = client(options);
