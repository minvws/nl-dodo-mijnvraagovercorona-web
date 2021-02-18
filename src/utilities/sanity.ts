import sanityClient, { ClientConfig } from '@sanity/client';

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

	return await client.fetch(
		getPageQuery({
			type,
			pageProjection,
			locale,
		}),
	);
};

const siteSettingsQuery = ({ locale }: { locale: 'nl' | 'en' }): string => `
	*[_type == "site-settings-document"][0]{
		${getLocaleProperty({ name: 'pageTitleSuffix', locale })},
		"privacy": {
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
	}`;

export const getSiteSettingsQuery = async ({
	locale,
}: {
	locale: 'nl' | 'en';
}) => await client.fetch(siteSettingsQuery({ locale }));

/**
 * This will create a Sanity GROQ Query for a specific page type
 */
export const getPageQuery = ({
	type,
	pageProjection,
	documentsQuery,
	locale,
}: {
	type: string;
	pageProjection: string;
	documentsQuery?: string;
	locale: 'nl' | 'en';
}): string => `{
	"page": *[_type == "${type}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale })},
	${documentsQuery && `"documents": ${documentsQuery}`}
}`;

/**
 * This will initialize the Sanity client
 */
const client = sanityClient(options);

export default client;
