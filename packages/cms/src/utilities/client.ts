import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: 'yiy91tbc',
	dataset: 'main',
	apiVersion: '2023-03-21',
	useCdn: false,
});

export default client;
