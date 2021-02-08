import sanityClient, { ClientConfig } from '@sanity/client';

const options: ClientConfig = {
	dataset: 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
	useCdn: process.env.NODE_ENV === 'production' || false,
};

export const previewClient = sanityClient({
	...options,
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

export const getLocaleProperty = (name: string, path?: string): string =>
	`"${name}": ${path || name}.${process.env.NEXT_PUBLIC_LOCALE}`;

export const getPageQuery = ({
	type,
	pageProjection,
}: {
	type: string;
	pageProjection: string;
}) => `{"page": *[_type == "${type}"][0]${pageProjection}, "siteSettings": *[_type == "site-settings-document"][0]{
	${getLocaleProperty('pageTitleSuffix')}
}}`;

const client = sanityClient(options);

export default client;
