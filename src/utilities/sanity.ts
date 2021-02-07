import sanityClient, { ClientConfig } from '@sanity/client';

const options: ClientConfig = {
	dataset: 'production',
	projectId: '6h7384ur',
	useCdn: process.env.NODE_ENV === 'production' || false,
};

export const previewClient = sanityClient({
	...options,
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

const client = sanityClient(options);

export default client;
