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
export const getLocaleProperty = (name: string, path?: string): string =>
	`"${name}": ${path || name}.${process.env.NEXT_PUBLIC_LOCALE}`;

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
export const getContentPageQuery = async (
	type: string,
): Promise<ContentPageProps> => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty('title', 'metaData.title')},
			${getLocaleProperty('description', 'metaData.description')},
		},
		${getLocaleProperty('title')},
		${getLocaleProperty('content')},
		url
	}`;

	return await client.fetch(
		getPageQuery({
			type,
			pageProjection,
		}),
	);
};

/**
 * This will create a Sanity GROQ Query for a specific page type
 */
export const getPageQuery = ({
	type,
	pageProjection,
	documentsQuery,
}: {
	type: string;
	pageProjection: string;
	documentsQuery?: string;
}): string => `{
	"page": *[_type == "${type}"][0]${pageProjection},
	"siteSettings": *[_type == "site-settings-document"][0]{
		${getLocaleProperty('pageTitleSuffix')}
	},
	${documentsQuery && `"documents": ${documentsQuery}`}
}`;

/**
 * This will initialize the Sanity client
 */
const client = sanityClient(options);

export default client;
